// src/index.ts
import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "url";
import path from "path";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "dist/preload.js"), // Now this works
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

app.whenReady().then(createWindow);
