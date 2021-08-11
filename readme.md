## 流程
1. 傀儡端告知控制端本机控制码
   - 建立端与控制码的关系
2. 控制端输入控制码连接傀儡端 
   - 通过控制码找到用户 -> 服务端需求
   - 建立用户间连接 -> 服务端需求 or 客户端需求
3. 傀儡端将捕获的画面传至控制端 
   - 捕获画面 、播放画面-> 客户端需求
   - 用户间画面传输 -> 服务端需求/客户端需求
4. 控制端的鼠标和键盘指令传送至傀儡端 
   - 捕获指令 -> 客户端需求
   - 用户间指令传输 -> 服务端需求/客户端需求
5. 傀儡端响应控制指令
   - 响应指令 -> 客户端需求

## 技术关键点
### **怎么捕获画面?**
`desktopCapturer`

 使用`navigator.mediaDevices.getUserMedia` API 从桌面捕获音频和视频的媒体源的信息

[**Process: Renderer**](https://www.electronjs.org/docs/api/desktop-capturer)

### **怎么完成用户间连接、画面+指令传输?**
`WebRTC`

[Web Real-Time Communications](https://github.com/mappum/electron-webrtc/tree/4597297e7e7e5149b14014eb1cf6457323596e5f)

### **怎么响应控制指令?**
`robotjs(Node.js)`

[robotjs(Node.js)](https://www.npmjs.com/package/robotjs)

## Electron 与 React 框架结合
### 跟 Electron 在一起工作要做些什么呢?
- 书写 React， 并且编译它。CRA 其实一个好的选择。 
- 处理引入 electron/node 模块:
  - Webpack 配置:https://webpack.js.org/configuration/target/
  - window.require
- Windows 根据环境信息加载本地或者 devServer url
  - electron-is-dev 
- 启动命令适配。等到编译成功再启动 ELectron
  - concurently 
  - wait on


### react的启动命令中加入BROWSER=NONE的参数可以取消打开浏览器
`"start": "BROWSER=NONE react-scripts start",`

`start:electron: "electron ."`  用来启动electron工程

`"start:render": "cd app/renderer/src/main && npm start"` 用来启动react的页面工程

### 区分正式环境和测时环境
```js
npm install electron-is-dev
const isDev = require('electron-is-dev');
if (isDev) {
	console.log('Running in development');
} else {
	console.log('Running in production');
}
```

### 主页面引入electron的方法

方法1：

`const { ipcRenderer } *=* window.require('electron')`

方法2: 修改webpack的target

```js
npm i customize-cra react-app-rewired --save-dev
```

config-overrides.js

```js
const { override } = require('customize-cra')

function addRendererTarget(config){
	config.target = 'electron-renderer'
	return config
}

module.exports = override(addRendererTarget)
```

```js
import { ipcRenderer } from 'electron' 
```





### 一条命令启动工程

todo