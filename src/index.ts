// src/index.ts
import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import path from "path";
import { getDatabase } from "../database/config/database.js";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbInitialized = false;

function createWindow(): void {
  const isPackaged = app.isPackaged;

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: isPackaged
        ? path.join(__dirname, "preload.js")
        : path.join(__dirname, "..", "dist", "src", "preload.js"),
    },
  });

  // Load your frontend
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
  if (!dbInitialized) {
    try {
      const db = getDatabase();
      dbInitialized = true;
      console.log("SQLite database ready at", db.name);
    } catch (err) {
      console.error("Failed to initialize database", err);
    }
  }

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
