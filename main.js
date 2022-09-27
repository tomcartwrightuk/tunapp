const {app, BrowserWindow, ipcMain, systemPreferences} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    devTools: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://localhost:3000');
  // mainWindow.loadURL('https://dangerous-electron-frontend.onrender.com');

  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

ipcMain.handle('mic-permissions-state', () => systemPreferences.getMediaAccessStatus('microphone'));
ipcMain.handle('request-mic-permissions', () => systemPreferences.askForMediaAccess('microphone'));

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
