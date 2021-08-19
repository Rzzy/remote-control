/*
 * @Author: your name
 * @Date: 2021-08-20 00:15:46
 * @LastEditTime: 2021-08-20 01:07:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \remote-control\app\renderer\pages\control\robot.js
 */
const { ipcMain} = require('electron')
const robot = require('robotjs')
const vkey = require('vkey')

function handleMouse(data){
    const { clientX, clientY, screen, video } = data
    let x = clientX * screen.width / video.width
    let y = clientY * screen.height / video.height

    robot.moveMouse(x, y)
    robot.mouseClick()
    
}

function handleKey(data){
    const { keyCode, meta, alt, ctrl, shift } = data
    const modifiers = []
    if(meta) modifiers.push('meta')
    if(alt) modifiers.push('alt')
    if(ctrl) modifiers.push('ctrl')
    if(shift) modifiers.push('shift')
    console.log(vkey[keyCode])
    let key = vkey[keyCode].toLowerCase()
    robot.keyTap(key, modifiers)
}

module.exports = function(){
    ipcMain.on('robot', (e, type, data) => {
        if(type==='mouse') {
            handleMouse(data)
        } else if(type==='key'){
            handleKey(data)
        }
    })
}