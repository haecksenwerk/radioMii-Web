const { app, BrowserWindow, Menu } = require('electron');

const isMac = process.platform === 'darwin';

app.setName('radioMii');

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'quit' }],
        },
      ]
    : []),
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [{ role: 'minimize' }, { role: 'togglefullscreen' }],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

const path = require('path'),
  isDev = require('electron-is-dev');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 768 });

  const appUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(appUrl);
  mainWindow.on('closed', () => (mainWindow = null));
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
