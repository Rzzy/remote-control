/*
 * @Author: your name
 * @Date: 2021-08-15 17:16:54
 * @LastEditTime: 2021-08-19 23:50:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \remote-control\app\main\index.js
 */
const { app } = require('electron')
const { create: createControlWin } = require('./window/control')
const handleIPC = require('./ipc')
app.allowRendererProcessReuse = false
app.on('ready',()=>{
	createControlWin()
	handleIPC()
})

