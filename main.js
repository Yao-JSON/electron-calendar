const { app, BrowserWindow , Tray } = require('electron');
const { join } = require('path');

class CalendarApp {
  constructor() {
    this.mianWin = null;
    this.tary = null;
  }
  
  getMainWin() {
    return this.mainWin;
  }

  createWindow() {
    this.mainWin = new BrowserWindow({
      width: 550,
      height: 382,
      frame: false,
      show: false,
      transparent: true,
      title: '有赞万年历',
      tabbingIdentifier: '万年历',
    });
  }
  
  createTary() {
    this.tary = new Tray(join(__dirname, './icons/calendar.jpg'));
  }

  init() {
    this.createWindow()
    this.createTary();
    this.mainWin.loadFile(join(__dirname, './dist/index.html'));
    this.listen();
  }

  listen() {
    const that = this;
    this.tary.on('click', (e, bounds ) => {
      that.setPosition(bounds);
      that.toggleWindow();
    })

    this.mainWin.on('blur', () => {
      this.mainWin.hide();
    })

    this.mainWin.on('closed', () => {
      that.mainWin = null;
    })
  }

  setPosition(bounds) {
    this.mainWin.setPosition(bounds.x -  275, bounds.y, false);
  }

  toggleWindow() {
    if(this.mainWin.isVisible()) {
      this.mainWin.hide();
    } else {
      this.mainWin.show();
    }
  }  

  destroy() {
    if(this.mainWin) {
      this.mainWin.destroy()
    }
    if(this.tary) {
      this.tary.destroy();
    }
  }
}


const myCalendar = new CalendarApp();

app.dock.hide()

app.on('ready', () => {
  myCalendar.init();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (myCalendar.getMainWin() === null) {
    myCalendar.init()
  }
})
