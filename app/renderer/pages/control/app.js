/*
 * @Author: Rz
 * @Date: 2021-08-19 21:30:32
 * @LastEditTime: 2021-08-20 01:02:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \remote-control\app\renderer\pages\control\app.js
 */
const peer = require('./peer-control')

peer.on('add-stream', (stream) => {
    play(stream)
})

let video = document.getElementById('screen-video')

function play(stream){
    video.srcObject = stream
    video.onloadedmetadata = function(){
        video.play()
    }
    
    
}


window.onkeydown = function(event) {

    
    peer.emit('robot', 'key', {
        keyCode: event.keyCode,
        shift: e.shift,
        alt: e.alt,
        meta: e.meta,
        control: e.control
    })
}
window.onclick = function(event) {
    
    const { clientX, clientY } = event
    
    peer.emit('robot', 'mouse', {
        clientX, 
        clientY, 
        video: {
            width:  video.getBoundingClientRect().width,
            height: video.getBoundingClientRect().height
        }
    })
}