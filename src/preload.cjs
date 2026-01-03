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

contextBridge.exposeInMainWorld("lifelinesApi", {
  list: async () => {
    console.log("[preload.cjs] lifelines:list invoked");
    return ipcRenderer.invoke("lifelines:list");
  },
  get: async (id) => {
    console.log("[preload.cjs] lifelines:get invoked", id);
    return ipcRenderer.invoke("lifelines:get", id);
  },
  create: async (payload) => {
    console.log("[preload.cjs] lifelines:create invoked", payload);
    return ipcRenderer.invoke("lifelines:create", payload);
  },
  update: async (payload) => {
    console.log("[preload.cjs] lifelines:update invoked", payload);
    return ipcRenderer.invoke("lifelines:update", payload);
  },
  delete: async (id) => {
    console.log("[preload.cjs] lifelines:delete invoked", id);
    return ipcRenderer.invoke("lifelines:delete", id);
  },
});

contextBridge.exposeInMainWorld("teamConfigApi", {
  get: async () => {
    console.log("[preload.cjs] teamConfig:get invoked");
    return ipcRenderer.invoke("teamConfig:get");
  },
  update: async (payload) => {
    console.log("[preload.cjs] teamConfig:update invoked", payload);
    return ipcRenderer.invoke("teamConfig:update", payload);
  },
  updateLifeline: async (payload) => {
    console.log("[preload.cjs] teamConfig:updateLifeline invoked", payload);
    return ipcRenderer.invoke("teamConfig:updateLifeline", payload);
  },
});

contextBridge.exposeInMainWorld("teamsApi", {
  list: async () => {
    console.log("[preload.cjs] teams:list invoked");
    return ipcRenderer.invoke("teams:list");
  },
  get: async (idOrSlug) => {
    console.log("[preload.cjs] teams:get invoked", idOrSlug);
    return ipcRenderer.invoke("teams:get", idOrSlug);
  },
  create: async (payload) => {
    console.log("[preload.cjs] teams:create invoked", payload);
    return ipcRenderer.invoke("teams:create", payload);
  },
  update: async (payload) => {
    console.log("[preload.cjs] teams:update invoked", payload);
    return ipcRenderer.invoke("teams:update", payload);
  },
  delete: async (id) => {
    console.log("[preload.cjs] teams:delete invoked", id);
    return ipcRenderer.invoke("teams:delete", id);
  },
  reorder: async (orderedIds) => {
    console.log("[preload.cjs] teams:reorder invoked", orderedIds);
    return ipcRenderer.invoke("teams:reorder", orderedIds);
  },
});

contextBridge.exposeInMainWorld("roundCategoriesApi", {
  list: async () => {
    console.log("[preload.cjs] roundCategories:list invoked");
    return ipcRenderer.invoke("roundCategories:list");
  },
  get: async (id) => {
    console.log("[preload.cjs] roundCategories:get invoked", id);
    return ipcRenderer.invoke("roundCategories:get", id);
  },
});

contextBridge.exposeInMainWorld("roundsApi", {
  list: async (setId) => {
    console.log("[preload.cjs] rounds:list invoked", setId);
    return ipcRenderer.invoke("rounds:list", setId);
  },
  get: async (id) => {
    console.log("[preload.cjs] rounds:get invoked", id);
    return ipcRenderer.invoke("rounds:get", id);
  },
  create: async (payload) => {
    console.log("[preload.cjs] rounds:create invoked", payload);
    return ipcRenderer.invoke("rounds:create", payload);
  },
  update: async (payload) => {
    console.log("[preload.cjs] rounds:update invoked", payload);
    return ipcRenderer.invoke("rounds:update", payload);
  },
  delete: async (id) => {
    console.log("[preload.cjs] rounds:delete invoked", id);
    return ipcRenderer.invoke("rounds:delete", id);
  },
  reorder: async (payload) => {
    console.log("[preload.cjs] rounds:reorder invoked", payload);
    return ipcRenderer.invoke("rounds:reorder", payload);
  },
});
