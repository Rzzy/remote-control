/*
 * @Author: Rz
 * @Date: 2021-08-19 21:34:30
 * @LastEditTime: 2021-08-19 22:03:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \remote-control\app\renderer\pages\control\peer-control.js
 */

const EventEmitter = require('events') // Node.js EventEmitter
const { desktopCapturer } = require('electron')
const peer = new EventEmitter()
/**
 * @description: 获取桌面流
 * @param {*}
 * @return {*}
 */
async function getScreenStream(){
    // 获取source
    const sources = await desktopCapturer.getSources({types:['screen']})
    // 
    navigator.getUserMedia({
        audio:false,
        video:{
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId:sources[0].id,
                maxWidth:window.screen.width,
                maxHeight:window.screen.height
            }
        }
    }, (stream) => {
        peer.emit('add-stream', stream)
    }, err => {
        console.err(err)
    })
}
getScreenStream()
module.exports = peer