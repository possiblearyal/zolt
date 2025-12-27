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
