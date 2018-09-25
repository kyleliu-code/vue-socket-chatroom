let io = require('socket.io')
const http = require('http')
const fs = require('fs')
const path = require('path')
const users = require('../models/users')
const cookieParser = require('cookie-parser')
const urlencode = require('urlencode')
const moment = require('moment')
const serverConf = require('../config/server')
const {
  addRecord
} = require('../models/records')
const secret = fs.readFileSync(path.resolve(__dirname, '../config/secret.key'), 'utf-8')

function getUnsignedCookie(cookieString, cookieName) {
  let matches = new RegExp(`${cookieName}=([^;]+)`, 'gmi').exec(cookieString);
  return matches && matches[1]
}

function getSessionId(socket) {
  let cookies = socket.request.headers.cookie;
  let unsignedCookie = urlencode.decode(getUnsignedCookie(cookies, serverConf.sessionName)); // 这里已经得到了 sessionid
  let sessionId = cookieParser.signedCookie(unsignedCookie, secret); // 解码 sessionId
  return sessionId;
}

function messageHandler(socketio) {
  socketio.on('connection', (socket) => { // socketio 连接监听

    socket.on('login', data => { // 有人登陆进来的时候监听

      console.log('login')
      let sessionId = getSessionId(socket);

      let time = data.time;
      if (sessionId) {
        users.setUserSocket(sessionId, socket);
        let username = users.getUsername(sessionId)

        // 广播用户进入聊天室
        // 订阅广播事件
        socket.broadcast.emit('someOneLogin', {
          user: {
            username,
            sessionId
          },
          msg: `${username} 进入了房间`,
          time
        })
      }
    })

    // broadcast
    socket.on('broadcast', data => {
      let sessionId = getSessionId(socket)
      let username = users.getUsername(sessionId)
      let msg = data.msg
      let time = data.time
      console.log(username)
      if (username) {
        socket.broadcast.emit('broadcast', {
          user: {
            sessionId,
            username
          },
          msg,
          time
        })

        // 存储聊天记录
        addRecord(username, sessionId, msg, time)
      }
    });

    socket.on('private', data => {
      let sessionId = getSessionId(socket);
      let username = users.getUsername(sessionId);
      let time = data.time;

      if (username) {
        let to = users.findUser(data.toSessionId);
        if (to) {
          to.socket.emit('private', {
            user: {
              sessionId,
              username
            },
            msg: data.msg,
            time
          });
        }
      }
    });

    socket.on('disconnect', () => {
      // console.log('disconnect---', socket)
      let sessionId = getSessionId(socket)
      let username = users.getUsername(sessionId)
      let time = moment().format('YYYY/MM/DD/ HH:mm:ss')
      socket.broadcast.emit('quit', {
        user: {
          sessionId,
          username
        },
        msg: `${username} 退出了聊天室`,
        time
      })
    })
  })
}

function createServer(app) {
  const server = http.createServer(app);
  io = io(server) //
  messageHandler(io)
  return server
}

module.exports = {
  createServer
}
