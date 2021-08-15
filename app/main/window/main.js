const { BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

let win
function create(){
    win = new BrowserWindow({
        width: 900,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    if(isDev) {
        win.loadURL('http://localhost:3000') // 加载react应用
    } else {
        win.loadURL(path.resolve(__dirname, '../../renderer/pages/index.html'))
    }
    win.webContents.openDevTools()
    return win
}
function send(channel, ...args) {
    win.webContents.send(channel, ...args)
}

module.exports = { create, send }