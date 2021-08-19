const { BrowserWindow } = require('electron')
const path = require('path')
let win
function create(){
    win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    
    win.loadURL(path.resolve(__dirname, '../../renderer/pages/control/index.html'))
    win.webContents.openDevTools()

    return win
}

function send(channel, ...arg) {
    win.webContents.send(channel, ...arg)
}
module.exports = { create }