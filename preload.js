/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 * 
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

const { contextBridge, ipcRenderer } = require("electron");

// API
const ipc = {
  getMicPermissionState: () => ipcRenderer.invoke('mic-permissions-state'),
  requestMicPermissions: () => ipcRenderer.invoke('request-mic-permissions'),
  platform: () => ipcRenderer.invoke('get-platform')
};

contextBridge.exposeInMainWorld("ipc", ipc);
