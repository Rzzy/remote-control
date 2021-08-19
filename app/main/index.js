/*
 * @Author: your name
 * @Date: 2021-08-15 17:16:54
 * @LastEditTime: 2021-08-20 00:56:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \remote-control\app\main\index.js
 */
const { app } = require('electron')
const { create: createControlWin } = require('./window/control')
const handleIPC = require('./ipc')
const robot = require('./robot')
app.allowRendererProcessReuse = false
app.on('ready',()=>{
	createControlWin()
	handleIPC()
	robot()
})

