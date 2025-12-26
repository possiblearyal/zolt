const { contextBridge, ipcRenderer } = require("electron");

console.log("[preload.cjs] Loaded preload script");

contextBridge.exposeInMainWorld("orgApi", {
  getOrg: async () => {
    console.log("[preload.cjs] org:get invoked");
    return ipcRenderer.invoke("org:get");
  },
  saveOrg: async (payload) => {
    console.log("[preload.cjs] org:save invoked", {
      hasName: Boolean(payload?.name),
      hasPin: Boolean(payload?.masterPin),
      hasImage: Boolean(payload?.imageUrl),
    });
    return ipcRenderer.invoke("org:save", payload);
  },
  updatePanel: async (payload) => {
    console.log("[preload.cjs] org:update-panel invoked", payload);
    return ipcRenderer.invoke("org:update-panel", payload);
  },
});
