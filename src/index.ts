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
          `INSERT INTO organizations (id, name, masterPin, imageUrl, themeModal, statsModal, createdAt, updatedAt)
           VALUES (@id, @name, @masterPin, @imageUrl, @themeModal, @statsModal, @createdAt, @updatedAt)
           ON CONFLICT(id) DO UPDATE SET
             name = excluded.name,
             masterPin = excluded.masterPin,
             imageUrl = excluded.imageUrl,
             themeModal = excluded.themeModal,
             statsModal = excluded.statsModal,
             updatedAt = excluded.updatedAt`
        ).run({
          id: "org-default",
          name,
          masterPin,
          imageUrl: imageUrl ?? null,
          themeModal: JSON.stringify({ x: 50, y: 50, mode: "percent" }),
          statsModal: JSON.stringify({ x: 50, y: 50, mode: "percent" }),
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
