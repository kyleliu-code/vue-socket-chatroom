# vue-socket-chatroom

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Error

### mogodb 相关报错

```cmd

PS C:\Users\Administrator\Desktop\vue-socket-chatroom> npm run server

> vue-socket-chatroom@1.0.0 server C:\Users\Administrator\Desktop\vue-socket-chatroom
> nodemon server/app.js

[nodemon] 1.18.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node server/app.js`
Example app listening on port 3001!
C:\Users\Administrator\Desktop\vue-socket-chatroom\node_modules\mongodb\lib\mongo_client.js:421
          throw err
          ^
MongoError: failed to connect to server [localhost:27017] on first connect [MongoError: connect ECONNREFUSED 127.0.0.1:27017]
    at Pool.<anonymous> (C:\Users\Administrator\Desktop\vue-socket-chatroom\node_modules\mongodb-core\lib\topologies\server.js:336:35)
    at emitOne (events.js:116:13)
    at Pool.emit (events.js:211:7)
    at Connection.<anonymous> (C:\Users\Administrator\Desktop\vue-socket-chatroom\node_modules\mongodb-core\lib\connection\pool.js:280:12)
    at Object.onceWrapper (events.js:317:30)
    at emitTwo (events.js:126:13)
    at Connection.emit (events.js:214:7)
    at Socket.<anonymous> (C:\Users\Administrator\Desktop\vue-socket-chatroom\node_modules\mongodb-core\lib\connection\connection.js:189:49)
    at Object.onceWrapper (events.js:315:30)
    at emitOne (events.js:116:13)
    at Socket.emit (events.js:211:7)
    at emitErrorNT (internal/streams/destroy.js:64:8)
    at _combinedTickCallback (internal/process/next_tick.js:138:11)
    at process._tickCallback (internal/process/next_tick.js:180:9)
[nodemon] app crashed - waiting for file changes before starting...

```
这个问题的原因是： mongo 库没有开启

我这边 win10 环境下，新安装了 mongo ，但是不知道为什么 mongo service 不能开启，在安装的时候也遇到权限问题不能启动服务

解决办法： 在mongo 安装目录下 bin 文件夹中 执行 mongod.exe 文件。 重新 `npm run server` 就 ok 了

### Uncaught TypeError: Cannot read property 'getters' of undefined

这个原因一般是 store 没有在 组件中注册