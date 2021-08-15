const { app } = require('electron')
const { create: createMainWin } = require('./window/main')
const handleIPC = require('./ipc')
app.on('ready',()=>{
	createMainWin()
	handleIPC()
})

