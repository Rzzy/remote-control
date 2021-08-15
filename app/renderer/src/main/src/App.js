import './App.css';
import React ,{ useState, useEffect } from 'react';
// const { ipcRenderer } = window.require('electron')
import { ipcRenderer } from 'electron'

function App() {
  // 定义属性
  const [ remoteCode, setRemoteCode ] = useState('')
  const [ localCode, setLocalCode  ] = useState('')
  const [ controlText, setControlText ] = useState('')
  // 登陆函数
  const login = async () => {
    /*
     * 登陆状态在主进程维护 通过ipcReenderer给主进程发起一个消息
       主进程登陆成功后，会返回一个code
     */

    let code = ipcRenderer.invoke('login')

    setLocalCode(code)
  }
  useEffect(() => {
    login() // 首先发起登录
    ipcRenderer.on('control-state-change', handleControlState) // 监听从主进程返回的状态变化
    return () => {  // 当组件被写在卸载时清理注册的事件 【 相当于 componentWillUnmounted】
      ipcRenderer.removeListener('control-state-change', handleControlState) 
    }

  }, [])
  const handleControlState = () => {}
  return (
    <div className="App">
      {
        controlText === '' ? <>
          <div> 你的控制码 { localCode }</div>
          <input type='text' value={ remoteCode } />
          <button>确认</button>
        </>: <div> { controlText } </div>
      }    
    </div>
  );
}

export default App;
