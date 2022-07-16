require('dotenv').config()
const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })

  win.loadURL(process.env.CLIENT_URL)

  win.webContents.openDevTools()
}


app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') return
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length > 0) return
  createWindow()
})
