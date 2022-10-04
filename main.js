const {app, Tray, Menu, nativeImage, BrowserWindow, ipcMain, systemPreferences} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 700,
    devTools: true,
    // frame: false, - disables window buttons as well
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://localhost:3010');
  // mainWindow.loadURL('https://dangerous-electron-frontend.onrender.com');

  if (process.env.DEV_TOOLS) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
}

app.whenReady().then(() => {
  createWindow();
  const icon = nativeImage.createFromPath('./src/assets/guitar-icon-16-white.png');
  const tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Start tuning', type: 'normal' },
  ]);

  tray.setToolTip('Tunapp: Tuner');
  tray.setContextMenu(contextMenu);

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

ipcMain.handle('request-mic-permissions', () => systemPreferences.askForMediaAccess('microphone'));
ipcMain.handle('mic-permissions-state', () => systemPreferences.getMediaAccessStatus('microphone'));
ipcMain.handle('get-platform', () => process.platform);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
