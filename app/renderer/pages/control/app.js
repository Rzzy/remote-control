/*
 * @Author: Rz
 * @Date: 2021-08-19 21:30:32
 * @LastEditTime: 2021-08-19 22:00:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \remote-control\app\renderer\pages\control\app.js
 */
const peer = require('./peer-control')

peer.on('add-stream', (stream) => {
    play(stream)
})

function play(stream){
    let video = document.getElementById('screen-video')
    video.srcObject = stream
    video.onloadedmetadata = function(){
        video.play()
    }
}