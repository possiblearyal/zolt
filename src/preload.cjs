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
  updateResizablePanels: async (payload) => {
    console.log("[preload.cjs] org:update-resizable-panels invoked", payload);
    return ipcRenderer.invoke("org:update-resizable-panels", payload);
  },
  updateTheme: async (themeId) => {
    console.log("[preload.cjs] org:update-theme invoked", themeId);
    return ipcRenderer.invoke("org:update-theme", themeId);
  },
});

contextBridge.exposeInMainWorld("setsApi", {
  list: async () => {
    console.log("[preload.cjs] sets:list invoked");
    return ipcRenderer.invoke("sets:list");
  },
  get: async (id) => {
    console.log("[preload.cjs] sets:get invoked", id);
    return ipcRenderer.invoke("sets:get", id);
  },
  create: async (payload) => {
    console.log("[preload.cjs] sets:create invoked", payload);
    return ipcRenderer.invoke("sets:create", payload);
  },
  update: async (payload) => {
    console.log("[preload.cjs] sets:update invoked", payload);
    return ipcRenderer.invoke("sets:update", payload);
  },
  delete: async (id) => {
    console.log("[preload.cjs] sets:delete invoked", id);
    return ipcRenderer.invoke("sets:delete", id);
  },
  setActive: async (id) => {
    console.log("[preload.cjs] sets:setActive invoked", id);
    return ipcRenderer.invoke("sets:setActive", id);
  },
});
