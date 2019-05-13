// Modules to control application life and create native browser window
const {app, BrowserWindow , Tray } = require('electron')
const { join } = require('path');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tary;

app.dock.hide();

function createWindow () {
  tray = new Tray(join(__dirname, './icons/16.png'));
  tray.setToolTip('This is my application.')
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600, 
    title: '有赞万年历',
    tabbingIdentifier: '万年历',
    show: false,
    frame: false,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  tray.on('click', (e, bounds, position) => {
    mainWindow.setPosition(bounds.x,bounds.y, false);
    mainWindow.isVisible() ? mainWindow.hide() : (mainWindow.show());
  })
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
 //  mainWindow.loadURL('https://github.com')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

