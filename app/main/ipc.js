const { ipcMain } = require('electron')
const { send: sendMinWindow } = require('./window/main')
const { create: createControlWin } = require('./window/control')
module.exports = function(){
 ipcMain.handle('login', async () =>  {
     let code = Math.floor( Math.random() * (999999 - 100000)) + 100000 
     return code 
 })   
 ipcMain.on('control', async (e, remoteCode)=> {
    console.log(remoteCode)
    sendMinWindow('control-state-change', remoteCode, 1)
    createControlWin()
 })
}