import { contextBridge, ipcRenderer } from "electron";

console.log("[preload] Loaded preload script");

contextBridge.exposeInMainWorld("orgApi", {
  getOrg: async () => {
    console.log("[preload] org:get invoked");
    return ipcRenderer.invoke("org:get");
  },
  saveOrg: async (payload: {
    name: string;
    masterPin: string;
    imageUrl?: string;
  }) => {
    console.log("[preload] org:save invoked", {
      hasName: Boolean(payload?.name),
      hasPin: Boolean(payload?.masterPin),
      hasImage: Boolean(payload?.imageUrl),
    });
    return ipcRenderer.invoke("org:save", payload);
  },
  updatePanel: async (payload: {
    panel: "theme" | "stats";
    position: { x: number; y: number; mode: "px" | "percent" };
  }) => {
    console.log("[preload] org:update-panel invoked", payload);
    return ipcRenderer.invoke("org:update-panel", payload);
  },
});

declare global {
  interface Window {
    orgApi?: {
      getOrg: () => Promise<any>;
      saveOrg: (payload: {
        name: string;
        masterPin: string;
        imageUrl?: string;
      }) => Promise<any>;
      updatePanel: (payload: {
        panel: "theme" | "stats";
        position: { x: number; y: number; mode: "px" | "percent" };
      }) => Promise<any>;
    };
  }
}
