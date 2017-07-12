const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg')
const { app, BrowserWindow, ipcMain} = electron;

let mainWindow;

app.on('ready', () => {
   mainWindow = new BrowserWindow({});
   mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('fileLength', (event, path)=> {
    ffmpeg.ffprobe(path, (err, data)=> {
        mainWindow.webContents.send('length', data.format.duration);
    })
})
