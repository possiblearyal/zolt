import { app, BrowserWindow, ipcMain, screen } from "electron";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { getDatabase } from "../database/config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolvePreloadPath(): string {
  const base = app.getAppPath();

  // const cjsBuilt = path.join(base, "dist", "src", "preload.cjs");
  // if (fs.existsSync(cjsBuilt)) return cjsBuilt;

  const cjsSource = path.join(base, "src", "preload.cjs");
  if (fs.existsSync(cjsSource)) return cjsSource;

  // const esmBuilt = path.join(base, "dist", "src", "preload.js");
  // if (fs.existsSync(esmBuilt)) return esmBuilt;

  // const esmFallback = path.join(__dirname, "preload.js");
  // if (fs.existsSync(esmFallback)) return esmFallback;

  console.error(
    "[main] Preload not found. Tried:",
    // cjsBuilt,
    cjsSource
    // esmBuilt,
    // esmFallback
  );
  throw new Error(
    "Preload script missing; add src/preload.cjs or build the preload."
  );
}

function clampPosition(position: {
  x: number;
  y: number;
  mode: "px" | "percent";
}) {
  const { x, y, mode } = position;
  if (mode === "percent") {
    const clamp = (val: number) => Math.min(100, Math.max(0, val));
    return { x: clamp(x), y: clamp(y), mode };
  }
  const display = screen.getPrimaryDisplay();
  const width = display?.workAreaSize?.width ?? 1280;
  const height = display?.workAreaSize?.height ?? 800;
  const clampPx = (val: number, max: number) =>
    Math.min(Math.max(val, 0), Math.max(0, max));
  return {
    x: clampPx(x, width),
    y: clampPx(y, height),
    mode,
  };
}

let dbInitialized = false;
let dbInstance: ReturnType<typeof getDatabase> | null = null;

function createWindow(): void {
  const isPackaged = app.isPackaged;

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: resolvePreloadPath(),
    },
  });

  console.log("[main] appPath:", app.getAppPath());
  console.log("[main] __dirname:", __dirname);
  console.log("[main] preload path:", mainWindow.webContents.getURL());

  // Load frontend
  //   const frontendPath = path.join(__dirname, "../frontend/index.html");
  //   mainWindow.loadFile(frontendPath);

  // loading the url because got some problems while loading from dir ( temp view )
  mainWindow.loadURL("http://localhost:5173");

  // Open DevTools in development
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  const preloadPath = resolvePreloadPath();
  console.log(
    "Resolved preload path:",
    preloadPath,
    "exists:",
    fs.existsSync(preloadPath)
  );

  if (!dbInitialized) {
    try {
      const db = getDatabase();
      dbInstance = db;
      dbInitialized = true;
      console.log("SQLite database ready at", db.name);
    } catch (err) {
      console.error("Failed to initialize database", err);
    }
  }

  ipcMain.handle("org:get", () => {
    try {
      const db = dbInstance ?? getDatabase();
      const row = db.prepare(`SELECT * FROM organizations LIMIT 1`).get();
      return row ?? null;
    } catch (err) {
      console.error("org:get failed", err);
      throw err;
    }
  });

  ipcMain.handle(
    "org:save",
    (
      _event,
      payload: { name: string; masterPin: string; imageUrl?: string }
    ) => {
      const { name, masterPin, imageUrl } = payload;
      if (!name || !masterPin) {
        throw new Error("name and masterPin are required");
      }
      const now = new Date().toISOString();
      try {
        const db = dbInstance ?? getDatabase();
        db.prepare(
          `INSERT INTO organizations (id, name, masterPin, imageUrl, themeModal, statsModal, selectedTheme, sidebarSize, topBarSize, bottomPanelSize, createdAt, updatedAt)
           VALUES (@id, @name, @masterPin, @imageUrl, @themeModal, @statsModal, @selectedTheme, @sidebarSize, @topBarSize, @bottomPanelSize, @createdAt, @updatedAt)
           ON CONFLICT(id) DO UPDATE SET
             name = excluded.name,
             masterPin = excluded.masterPin,
             imageUrl = excluded.imageUrl,
             updatedAt = excluded.updatedAt`
        ).run({
          id: "org-default",
          name,
          masterPin,
          imageUrl: imageUrl ?? null,
          themeModal: JSON.stringify({ x: 50, y: 50, mode: "percent" }),
          statsModal: JSON.stringify({ x: 50, y: 50, mode: "percent" }),
          selectedTheme: "blue",
          sidebarSize: 15,
          topBarSize: 8,
          bottomPanelSize: 7,
          createdAt: now,
          updatedAt: now,
        });
        const saved = db
          .prepare(`SELECT * FROM organizations WHERE id = ?`)
          .get("org-default");
        return saved;
      } catch (err) {
        console.error("org:save failed", err);
        throw err;
      }
    }
  );

  ipcMain.handle(
    "org:update-panel",
    (
      _event,
      payload: {
        panel: "theme" | "stats";
        position: { x: number; y: number; mode: "px" | "percent" };
      }
    ) => {
      try {
        const { panel, position } = payload;
        const db = dbInstance ?? getDatabase();

        const clamped = clampPosition(position);
        const field = panel === "theme" ? "themeModal" : "statsModal";
        db.prepare(
          `UPDATE organizations SET ${field} = @value, updatedAt = @updatedAt WHERE id = @id`
        ).run({
          id: "org-default",
          value: JSON.stringify(clamped),
          updatedAt: new Date().toISOString(),
        });
        const saved = db
          .prepare(`SELECT * FROM organizations WHERE id = ?`)
          .get("org-default");
        return saved;
      } catch (err) {
        console.error("org:update-panel failed", err);
        throw err;
      }
    }
  );

  ipcMain.handle(
    "org:update-resizable-panels",
    (
      _event,
      payload: {
        sidebarSize?: number;
        topBarSize?: number;
        bottomPanelSize?: number;
      }
    ) => {
      try {
        const db = dbInstance ?? getDatabase();
        const updates: string[] = [];
        const params: Record<string, unknown> = {
          id: "org-default",
          updatedAt: new Date().toISOString(),
        };

        if (payload.sidebarSize !== undefined) {
          updates.push("sidebarSize = @sidebarSize");
          params.sidebarSize = payload.sidebarSize;
        }
        if (payload.topBarSize !== undefined) {
          updates.push("topBarSize = @topBarSize");
          params.topBarSize = payload.topBarSize;
        }
        if (payload.bottomPanelSize !== undefined) {
          updates.push("bottomPanelSize = @bottomPanelSize");
          params.bottomPanelSize = payload.bottomPanelSize;
        }

        if (updates.length > 0) {
          updates.push("updatedAt = @updatedAt");
          db.prepare(
            `UPDATE organizations SET ${updates.join(", ")} WHERE id = @id`
          ).run(params);
        }

        const saved = db
          .prepare(`SELECT * FROM organizations WHERE id = ?`)
          .get("org-default");
        return saved;
      } catch (err) {
        console.error("org:update-resizable-panels failed", err);
        throw err;
      }
    }
  );

  ipcMain.handle("org:update-theme", (_event, themeId: string) => {
    try {
      const db = dbInstance ?? getDatabase();
      db.prepare(
        `UPDATE organizations SET selectedTheme = @selectedTheme, updatedAt = @updatedAt WHERE id = @id`
      ).run({
        id: "org-default",
        selectedTheme: themeId,
        updatedAt: new Date().toISOString(),
      });
      const saved = db
        .prepare(`SELECT * FROM organizations WHERE id = ?`)
        .get("org-default");
      return saved;
    } catch (err) {
      console.error("org:update-theme failed", err);
      throw err;
    }
  });

  ipcMain.handle("sets:list", () => {
    try {
      const db = dbInstance ?? getDatabase();
      const rows = db
        .prepare(`SELECT * FROM sets ORDER BY createdAt DESC`)
        .all();
      return rows ?? [];
    } catch (err) {
      console.error("sets:list failed", err);
      throw err;
    }
  });

  ipcMain.handle("sets:get", (_event, id: string) => {
    try {
      const db = dbInstance ?? getDatabase();
      const row = db.prepare(`SELECT * FROM sets WHERE id = ?`).get(id);
      return row ?? null;
    } catch (err) {
      console.error("sets:get failed", err);
      throw err;
    }
  });

  ipcMain.handle(
    "sets:create",
    (
      _event,
      payload: { name: string; description?: string; isActive?: boolean }
    ) => {
      const { name, description, isActive } = payload;
      if (!name) {
        throw new Error("name is required");
      }
      const now = new Date().toISOString();
      const id = `set-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      try {
        const db = dbInstance ?? getDatabase();
        if (isActive) {
          db.prepare(
            `UPDATE sets SET isActive = 0, updatedAt = @updatedAt`
          ).run({
            updatedAt: now,
          });
        }
        db.prepare(
          `INSERT INTO sets (id, name, description, isActive, createdAt, updatedAt)
           VALUES (@id, @name, @description, @isActive, @createdAt, @updatedAt)`
        ).run({
          id,
          name,
          description: description ?? null,
          isActive: isActive ? 1 : 0,
          createdAt: now,
          updatedAt: now,
        });
        const saved = db.prepare(`SELECT * FROM sets WHERE id = ?`).get(id);
        return saved;
      } catch (err) {
        console.error("sets:create failed", err);
        throw err;
      }
    }
  );

  ipcMain.handle(
    "sets:update",
    (
      _event,
      payload: {
        id: string;
        name?: string;
        description?: string;
        isActive?: boolean;
      }
    ) => {
      const { id, name, description, isActive } = payload;
      if (!id) {
        throw new Error("id is required");
      }
      try {
        const db = dbInstance ?? getDatabase();
        const updates: string[] = [];
        const params: Record<string, unknown> = {
          id,
          updatedAt: new Date().toISOString(),
        };

        if (name !== undefined) {
          updates.push("name = @name");
          params.name = name;
        }
        if (description !== undefined) {
          updates.push("description = @description");
          params.description = description;
        }
        if (isActive !== undefined) {
          updates.push("isActive = @isActive");
          params.isActive = isActive ? 1 : 0;
        }

        if (updates.length > 0) {
          updates.push("updatedAt = @updatedAt");
          db.prepare(
            `UPDATE sets SET ${updates.join(", ")} WHERE id = @id`
          ).run(params);
        }

        const saved = db.prepare(`SELECT * FROM sets WHERE id = ?`).get(id);
        return saved;
      } catch (err) {
        console.error("sets:update failed", err);
        throw err;
      }
    }
  );

  ipcMain.handle("sets:delete", (_event, id: string) => {
    try {
      const db = dbInstance ?? getDatabase();
      db.prepare(`DELETE FROM sets WHERE id = ?`).run(id);
      return { success: true };
    } catch (err) {
      console.error("sets:delete failed", err);
      throw err;
    }
  });

  ipcMain.handle("sets:setActive", (_event, id: string) => {
    try {
      const db = dbInstance ?? getDatabase();
      const now = new Date().toISOString();
      db.prepare(`UPDATE sets SET isActive = 0, updatedAt = @updatedAt`).run({
        updatedAt: now,
      });
      db.prepare(
        `UPDATE sets SET isActive = 1, updatedAt = @updatedAt WHERE id = @id`
      ).run({
        id,
        updatedAt: now,
      });
      const saved = db.prepare(`SELECT * FROM sets WHERE id = ?`).get(id);
      return saved;
    } catch (err) {
      console.error("sets:setActive failed", err);
      throw err;
    }
  });

  ipcMain.handle("lifelines:list", () => {
    try {
      const db = dbInstance ?? getDatabase();
      const rows = db
        .prepare(`SELECT * FROM lifelines ORDER BY createdAt ASC`)
        .all();
      return rows ?? [];
    } catch (err) {
      console.error("lifelines:list failed", err);
      throw err;
    }
  });

  ipcMain.handle("lifelines:get", (_event, id: string) => {
    try {
      const db = dbInstance ?? getDatabase();
      const row = db.prepare(`SELECT * FROM lifelines WHERE id = ?`).get(id);
      return row ?? null;
    } catch (err) {
      console.error("lifelines:get failed", err);
      throw err;
    }
  });

  ipcMain.handle(
    "lifelines:create",
    (
      _event,
      payload: {
        slug: string;
        displayName: string;
        description?: string;
        isEnabled?: boolean;
      }
    ) => {
      const { slug, displayName, description, isEnabled } = payload;
      if (!slug || !displayName) {
        throw new Error("slug and displayName are required");
      }
      const now = new Date().toISOString();
      const id = `lifeline-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      try {
        const db = dbInstance ?? getDatabase();
        db.prepare(
          `INSERT INTO lifelines (id, slug, displayName, description, isEnabled, createdAt, updatedAt)
           VALUES (@id, @slug, @displayName, @description, @isEnabled, @createdAt, @updatedAt)`
        ).run({
          id,
          slug,
          displayName,
          description: description ?? null,
          isEnabled: isEnabled !== false ? 1 : 0,
          createdAt: now,
          updatedAt: now,
        });
        const saved = db
          .prepare(`SELECT * FROM lifelines WHERE id = ?`)
          .get(id);
        return saved;
      } catch (err) {
        console.error("lifelines:create failed", err);
        throw err;
      }
    }
  );

  ipcMain.handle(
    "lifelines:update",
    (
      _event,
      payload: {
        id: string;
        slug?: string;
        displayName?: string;
        description?: string;
        isEnabled?: boolean;
      }
    ) => {
      const { id, slug, displayName, description, isEnabled } = payload;
      if (!id) {
        throw new Error("id is required");
      }
      try {
        const db = dbInstance ?? getDatabase();
        const updates: string[] = [];
        const params: Record<string, unknown> = {
          id,
          updatedAt: new Date().toISOString(),
        };

        if (slug !== undefined) {
          updates.push("slug = @slug");
          params.slug = slug;
        }
        if (displayName !== undefined) {
          updates.push("displayName = @displayName");
          params.displayName = displayName;
        }
        if (description !== undefined) {
          updates.push("description = @description");
          params.description = description;
        }
        if (isEnabled !== undefined) {
          updates.push("isEnabled = @isEnabled");
          params.isEnabled = isEnabled ? 1 : 0;
        }

        if (updates.length > 0) {
          updates.push("updatedAt = @updatedAt");
          db.prepare(
            `UPDATE lifelines SET ${updates.join(", ")} WHERE id = @id`
          ).run(params);
        }

        const saved = db
          .prepare(`SELECT * FROM lifelines WHERE id = ?`)
          .get(id);
        return saved;
      } catch (err) {
        console.error("lifelines:update failed", err);
        throw err;
      }
    }
  );

  ipcMain.handle("lifelines:delete", (_event, id: string) => {
    try {
      const db = dbInstance ?? getDatabase();
      db.prepare(`DELETE FROM lifelines WHERE id = ?`).run(id);
      return { success: true };
    } catch (err) {
      console.error("lifelines:delete failed", err);
      throw err;
    }
  });

  ipcMain.handle("teamConfig:get", () => {
    try {
      const db = dbInstance ?? getDatabase();
      const config = db
        .prepare(`SELECT * FROM team_config WHERE id = 'config-default'`)
        .get();
      const lifelines = db
        .prepare(
          `SELECT tcl.*, l.slug, l.displayName, l.description as lifelineDescription
           FROM team_config_lifelines tcl
           JOIN lifelines l ON tcl.lifelineId = l.id
           WHERE tcl.configId = 'config-default'
           ORDER BY l.createdAt ASC`
        )
        .all();
      return { config, lifelines };
    } catch (err) {
      console.error("teamConfig:get failed", err);
      throw err;
    }
  });

  ipcMain.handle(
    "teamConfig:update",
    (_event, payload: { maxPasses?: number; maxHints?: number }) => {
      const { maxPasses, maxHints } = payload;
      try {
        const db = dbInstance ?? getDatabase();
        const updates: string[] = [];
        const params: Record<string, unknown> = {
          id: "config-default",
          updatedAt: new Date().toISOString(),
        };

        if (maxPasses !== undefined) {
          updates.push("maxPasses = @maxPasses");
          params.maxPasses = maxPasses;
        }
        if (maxHints !== undefined) {
          updates.push("maxHints = @maxHints");
          params.maxHints = maxHints;
        }

        if (updates.length > 0) {
          updates.push("updatedAt = @updatedAt");
          db.prepare(
            `UPDATE team_config SET ${updates.join(", ")} WHERE id = @id`
          ).run(params);
        }

        const saved = db
          .prepare(`SELECT * FROM team_config WHERE id = 'config-default'`)
          .get();
        return saved;
      } catch (err) {
        console.error("teamConfig:update failed", err);
        throw err;
      }
    }
  );

  ipcMain.handle(
    "teamConfig:updateLifeline",
    (
      _event,
      payload: {
        lifelineId: string;
        defaultCount?: number;
        isEnabled?: boolean;
      }
    ) => {
      const { lifelineId, defaultCount, isEnabled } = payload;
      if (!lifelineId) {
        throw new Error("lifelineId is required");
      }
      try {
        const db = dbInstance ?? getDatabase();
        const now = new Date().toISOString();

        const existing = db
          .prepare(
            `SELECT * FROM team_config_lifelines WHERE configId = 'config-default' AND lifelineId = ?`
          )
          .get(lifelineId);

        if (existing) {
          const updates: string[] = [];
          const params: Record<string, unknown> = {
            configId: "config-default",
            lifelineId,
            updatedAt: now,
          };

          if (defaultCount !== undefined) {
            updates.push("defaultCount = @defaultCount");
            params.defaultCount = defaultCount;
          }
          if (isEnabled !== undefined) {
            updates.push("isEnabled = @isEnabled");
            params.isEnabled = isEnabled ? 1 : 0;
          }

          if (updates.length > 0) {
            updates.push("updatedAt = @updatedAt");
            db.prepare(
              `UPDATE team_config_lifelines SET ${updates.join(", ")} WHERE configId = @configId AND lifelineId = @lifelineId`
            ).run(params);
          }
        } else {
          const id = `tcl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
          db.prepare(
            `INSERT INTO team_config_lifelines (id, configId, lifelineId, defaultCount, isEnabled, createdAt, updatedAt)
             VALUES (@id, @configId, @lifelineId, @defaultCount, @isEnabled, @createdAt, @updatedAt)`
          ).run({
            id,
            configId: "config-default",
            lifelineId,
            defaultCount: defaultCount ?? 1,
            isEnabled: isEnabled !== false ? 1 : 0,
            createdAt: now,
            updatedAt: now,
          });
        }

        const saved = db
          .prepare(
            `SELECT tcl.*, l.slug, l.displayName
             FROM team_config_lifelines tcl
             JOIN lifelines l ON tcl.lifelineId = l.id
             WHERE tcl.configId = 'config-default' AND tcl.lifelineId = ?`
          )
          .get(lifelineId);
        return saved;
      } catch (err) {
        console.error("teamConfig:updateLifeline failed", err);
        throw err;
      }
    }
  );

  ipcMain.handle("teams:list", () => {
    try {
      const db = dbInstance ?? getDatabase();
      const rows = db
        .prepare(`SELECT * FROM teams ORDER BY displayOrder ASC, createdAt ASC`)
        .all();
      return rows ?? [];
    } catch (err) {
      console.error("teams:list failed", err);
      throw err;
    }
  });

  ipcMain.handle("teams:get", (_event, idOrSlug: string) => {
    try {
      const db = dbInstance ?? getDatabase();
      const row = db
        .prepare(`SELECT * FROM teams WHERE id = ? OR slug = ?`)
        .get(idOrSlug, idOrSlug);
      return row ?? null;
    } catch (err) {
      console.error("teams:get failed", err);
      throw err;
    }
  });

  ipcMain.handle(
    "teams:create",
    (_event, payload: { name: string; logoUrl?: string }) => {
      const { name, logoUrl } = payload;
      if (!name) {
        throw new Error("name is required");
      }
      const now = new Date().toISOString();
      const id = `team-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const baseSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      try {
        const db = dbInstance ?? getDatabase();

        let slug = baseSlug || "team";
        let counter = 1;
        while (
          db.prepare(`SELECT 1 FROM teams WHERE slug = ?`).get(slug) !==
          undefined
        ) {
          slug = `${baseSlug}-${counter}`;
          counter++;
        }

        const maxOrder = db
          .prepare(`SELECT MAX(displayOrder) as maxOrder FROM teams`)
          .get() as { maxOrder: number | null };
        const displayOrder = (maxOrder?.maxOrder ?? -1) + 1;

        db.prepare(
          `INSERT INTO teams (id, name, slug, logoUrl, displayOrder, createdAt, updatedAt)
           VALUES (@id, @name, @slug, @logoUrl, @displayOrder, @createdAt, @updatedAt)`
        ).run({
          id,
          name,
          slug,
          logoUrl: logoUrl ?? null,
          displayOrder,
          createdAt: now,
          updatedAt: now,
        });
        const saved = db.prepare(`SELECT * FROM teams WHERE id = ?`).get(id);
        return saved;
      } catch (err) {
        console.error("teams:create failed", err);
        throw err;
      }
    }
  );

  ipcMain.handle(
    "teams:update",
    (
      _event,
      payload: {
        id: string;
        name?: string;
        logoUrl?: string;
        displayOrder?: number;
      }
    ) => {
      const { id, name, logoUrl, displayOrder } = payload;
      if (!id) {
        throw new Error("id is required");
      }
      try {
        const db = dbInstance ?? getDatabase();
        const updates: string[] = [];
        const params: Record<string, unknown> = {
          id,
          updatedAt: new Date().toISOString(),
        };

        if (name !== undefined) {
          updates.push("name = @name");
          params.name = name;
          const baseSlug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
          let slug = baseSlug || "team";
          let counter = 1;
          while (
            db
              .prepare(`SELECT 1 FROM teams WHERE slug = ? AND id != ?`)
              .get(slug, id) !== undefined
          ) {
            slug = `${baseSlug}-${counter}`;
            counter++;
          }
          updates.push("slug = @slug");
          params.slug = slug;
        }
        if (logoUrl !== undefined) {
          updates.push("logoUrl = @logoUrl");
          params.logoUrl = logoUrl;
        }
        if (displayOrder !== undefined) {
          updates.push("displayOrder = @displayOrder");
          params.displayOrder = displayOrder;
        }

        if (updates.length > 0) {
          updates.push("updatedAt = @updatedAt");
          db.prepare(
            `UPDATE teams SET ${updates.join(", ")} WHERE id = @id`
          ).run(params);
        }

        const saved = db.prepare(`SELECT * FROM teams WHERE id = ?`).get(id);
        return saved;
      } catch (err) {
        console.error("teams:update failed", err);
        throw err;
      }
    }
  );

  ipcMain.handle("teams:delete", (_event, id: string) => {
    try {
      const db = dbInstance ?? getDatabase();
      db.prepare(`DELETE FROM teams WHERE id = ?`).run(id);
      return { success: true };
    } catch (err) {
      console.error("teams:delete failed", err);
      throw err;
    }
  });

  ipcMain.handle("teams:reorder", (_event, orderedIds: string[]) => {
    try {
      const db = dbInstance ?? getDatabase();
      const now = new Date().toISOString();
      const stmt = db.prepare(
        `UPDATE teams SET displayOrder = @displayOrder, updatedAt = @updatedAt WHERE id = @id`
      );
      orderedIds.forEach((id, index) => {
        stmt.run({ id, displayOrder: index, updatedAt: now });
      });
      const rows = db
        .prepare(`SELECT * FROM teams ORDER BY displayOrder ASC`)
        .all();
      return rows;
    } catch (err) {
      console.error("teams:reorder failed", err);
      throw err;
    }
  });


  ipcMain.handle("roundCategories:list", () => {
    try {
      const db = dbInstance ?? getDatabase();
      const rows = db
        .prepare(`SELECT * FROM round_categories ORDER BY name ASC`)
        .all() as Record<string, unknown>[];
      return rows.map((row) => ({
        ...row,
        defaultConfiguration:
          typeof row.defaultConfiguration === "string"
            ? JSON.parse(row.defaultConfiguration)
            : row.defaultConfiguration,
      }));
    } catch (err) {
      console.error("roundCategories:list failed", err);
      throw err;
    }
  });

  ipcMain.handle("roundCategories:get", (_event, id: string) => {
    try {
      const db = dbInstance ?? getDatabase();
      const row = db
        .prepare(`SELECT * FROM round_categories WHERE id = ?`)
        .get(id) as Record<string, unknown> | undefined;
      if (!row) return null;
      return {
        ...row,
        defaultConfiguration:
          typeof row.defaultConfiguration === "string"
            ? JSON.parse(row.defaultConfiguration)
            : row.defaultConfiguration,
      };
    } catch (err) {
      console.error("roundCategories:get failed", err);
      throw err;
    }
  });


  ipcMain.handle("rounds:list", (_event, setId?: string) => {
    try {
      const db = dbInstance ?? getDatabase();
      let query = `
        SELECT r.*, rc.name as categoryName, rc.contentMode as categoryContentMode
        FROM rounds r
        LEFT JOIN round_categories rc ON r.categoryId = rc.id
      `;
      if (setId) {
        query += ` WHERE r.setId = ? ORDER BY r.position ASC`;
        const rows = db.prepare(query).all(setId) as Record<string, unknown>[];
        return rows.map((row) => ({
          ...row,
          configuration:
            typeof row.configuration === "string"
              ? JSON.parse(row.configuration)
              : row.configuration,
          confirmationRequired: row.confirmationRequired === 1,
        }));
      }
      query += ` ORDER BY r.setId, r.position ASC`;
      const rows = db.prepare(query).all() as Record<string, unknown>[];
      return rows.map((row) => ({
        ...row,
        configuration:
          typeof row.configuration === "string"
            ? JSON.parse(row.configuration)
            : row.configuration,
        confirmationRequired: row.confirmationRequired === 1,
      }));
    } catch (err) {
      console.error("rounds:list failed", err);
      throw err;
    }
  });

  ipcMain.handle("rounds:get", (_event, id: string) => {
    try {
      const db = dbInstance ?? getDatabase();
      const row = db
        .prepare(
          `
        SELECT r.*, rc.name as categoryName, rc.contentMode as categoryContentMode
        FROM rounds r
        LEFT JOIN round_categories rc ON r.categoryId = rc.id
        WHERE r.id = ?
      `
        )
        .get(id) as Record<string, unknown> | undefined;
      if (!row) return null;
      return {
        ...row,
        configuration:
          typeof row.configuration === "string"
            ? JSON.parse(row.configuration)
            : row.configuration,
        confirmationRequired: row.confirmationRequired === 1,
      };
    } catch (err) {
      console.error("rounds:get failed", err);
      throw err;
    }
  });

  ipcMain.handle(
    "rounds:create",
    (
      _event,
      payload: {
        setId: string;
        categoryId: string;
        name: string;
        description?: string;
        configuration?: Record<string, unknown>;
        confirmationRequired?: boolean;
      }
    ) => {
      const {
        setId,
        categoryId,
        name,
        description,
        configuration,
        confirmationRequired,
      } = payload;
      try {
        const db = dbInstance ?? getDatabase();

        const category = db
          .prepare(
            `SELECT defaultConfiguration FROM round_categories WHERE id = ?`
          )
          .get(categoryId) as { defaultConfiguration: string } | undefined;

        let defaultConfig = {};
        if (category) {
          defaultConfig =
            typeof category.defaultConfiguration === "string"
              ? JSON.parse(category.defaultConfiguration)
              : category.defaultConfiguration;
        }

        const finalConfig = configuration
          ? { ...defaultConfig, ...configuration }
          : defaultConfig;

        const maxPos = db
          .prepare(`SELECT MAX(position) as maxPos FROM rounds WHERE setId = ?`)
          .get(setId) as { maxPos: number | null };
        const position = (maxPos?.maxPos ?? -1) + 1;

        const id = `round_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const now = new Date().toISOString();

        db.prepare(
          `INSERT INTO rounds (id, setId, categoryId, name, description, position, configuration, confirmationRequired, createdAt)
           VALUES (@id, @setId, @categoryId, @name, @description, @position, @configuration, @confirmationRequired, @createdAt)`
        ).run({
          id,
          setId,
          categoryId,
          name,
          description: description ?? null,
          position,
          configuration: JSON.stringify(finalConfig),
          confirmationRequired: confirmationRequired ? 1 : 0,
          createdAt: now,
        });

        const saved = db
          .prepare(
            `
          SELECT r.*, rc.name as categoryName, rc.contentMode as categoryContentMode
          FROM rounds r
          LEFT JOIN round_categories rc ON r.categoryId = rc.id
          WHERE r.id = ?
        `
          )
          .get(id) as Record<string, unknown>;

        return {
          ...saved,
          configuration:
            typeof saved.configuration === "string"
              ? JSON.parse(saved.configuration)
              : saved.configuration,
          confirmationRequired: saved.confirmationRequired === 1,
        };
      } catch (err) {
        console.error("rounds:create failed", err);
        throw err;
      }
    }
  );

  ipcMain.handle(
    "rounds:update",
    (
      _event,
      payload: {
        id: string;
        categoryId?: string;
        name?: string;
        description?: string;
        configuration?: Record<string, unknown>;
        confirmationRequired?: boolean;
      }
    ) => {
      const {
        id,
        categoryId,
        name,
        description,
        configuration,
        confirmationRequired,
      } = payload;
      try {
        const db = dbInstance ?? getDatabase();

        const updates: string[] = [];
        const params: Record<string, unknown> = { id };

        if (categoryId !== undefined) {
          updates.push("categoryId = @categoryId");
          params.categoryId = categoryId;
        }
        if (name !== undefined) {
          updates.push("name = @name");
          params.name = name;
        }
        if (description !== undefined) {
          updates.push("description = @description");
          params.description = description;
        }
        if (configuration !== undefined) {
          const existing = db
            .prepare(`SELECT configuration FROM rounds WHERE id = ?`)
            .get(id) as { configuration: string } | undefined;
          let existingConfig = {};
          if (existing) {
            existingConfig =
              typeof existing.configuration === "string"
                ? JSON.parse(existing.configuration)
                : existing.configuration;
          }
          const mergedConfig = { ...existingConfig, ...configuration };
          updates.push("configuration = @configuration");
          params.configuration = JSON.stringify(mergedConfig);
        }
        if (confirmationRequired !== undefined) {
          updates.push("confirmationRequired = @confirmationRequired");
          params.confirmationRequired = confirmationRequired ? 1 : 0;
        }

        if (updates.length > 0) {
          db.prepare(
            `UPDATE rounds SET ${updates.join(", ")} WHERE id = @id`
          ).run(params);
        }

        const saved = db
          .prepare(
            `
          SELECT r.*, rc.name as categoryName, rc.contentMode as categoryContentMode
          FROM rounds r
          LEFT JOIN round_categories rc ON r.categoryId = rc.id
          WHERE r.id = ?
        `
          )
          .get(id) as Record<string, unknown>;

        return {
          ...saved,
          configuration:
            typeof saved.configuration === "string"
              ? JSON.parse(saved.configuration)
              : saved.configuration,
          confirmationRequired: saved.confirmationRequired === 1,
        };
      } catch (err) {
        console.error("rounds:update failed", err);
        throw err;
      }
    }
  );

  ipcMain.handle("rounds:delete", (_event, id: string) => {
    try {
      const db = dbInstance ?? getDatabase();
      const round = db
        .prepare(`SELECT setId, position FROM rounds WHERE id = ?`)
        .get(id) as { setId: string; position: number } | undefined;

      db.prepare(`DELETE FROM rounds WHERE id = ?`).run(id);

      if (round) {
        db.prepare(
          `UPDATE rounds SET position = position - 1 WHERE setId = ? AND position > ?`
        ).run(round.setId, round.position);
      }

      return { success: true };
    } catch (err) {
      console.error("rounds:delete failed", err);
      throw err;
    }
  });

  ipcMain.handle(
    "rounds:reorder",
    (_event, payload: { setId: string; roundIds: string[] }) => {
      const { setId, roundIds } = payload;
      try {
        const db = dbInstance ?? getDatabase();
        const stmt = db.prepare(
          `UPDATE rounds SET position = @position WHERE id = @id AND setId = @setId`
        );
        roundIds.forEach((id, index) => {
          stmt.run({ id, position: index, setId });
        });
        const rows = db
          .prepare(
            `
          SELECT r.*, rc.name as categoryName, rc.contentMode as categoryContentMode
          FROM rounds r
          LEFT JOIN round_categories rc ON r.categoryId = rc.id
          WHERE r.setId = ?
          ORDER BY r.position ASC
        `
          )
          .all(setId) as Record<string, unknown>[];
        return rows.map((row) => ({
          ...row,
          configuration:
            typeof row.configuration === "string"
              ? JSON.parse(row.configuration)
              : row.configuration,
          confirmationRequired: row.confirmationRequired === 1,
        }));
      } catch (err) {
        console.error("rounds:reorder failed", err);
        throw err;
      }
    }
  );

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
