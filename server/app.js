const express = require('express')
const path = require('path')
const logger = require('morgan') // http logger middleware
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const fs = require('fs');
const serverConf = require('./config/server')
// const favicon = require('serve-favicon')

const dbUrl = require('./config/db').url; // 库地址

const chat = require('./route/chat')
const socketHandler = require('./middlewares/socketHandler');
const secret = fs.readFileSync(path.resolve(__dirname,'./config/secret.key'), 'utf-8') // 获取 secret key
const app = express(); // 实例化一个服务

app.disable('x-powered-by')

// 启用 session 会话
app.use(session({ 
  secret, // 私钥
  name: serverConf.sessionName,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // signed: true
    secure: false,
    expires: new Date(Date.now() + (1000 * 60 * 60 * 24)), //cookie 保存一天
    httpOnly: true
  },
  store: new MongoStore({
      url: dbUrl
    })
})) 
      
app.use(cookieParser(secret)) // 解析客户端传来的 cookie
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json()) // 解析json 
app.use(bodyParser.urlencoded({extended: false})) // 解析表单
app.use('/static', express.static(path.join(__dirname, '../dist/static')))

// 跨域 // 请求控制
app.all("*", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Origin', 'Content-Type, Content-Length,Authorization, Accept, X-Request-With')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  res.header('X-Powered-By', '3.2.1')
  if (req.method === 'OPTIONS') {
    res.send(200); // options 以检测服务器支持哪些 HTTP 方法， 快速返回
  } else {
    next();
  }
})

app.use('/api', chat) // 路由

// 上线路由
if (process.env.NODE_ENV !== 'development') {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
  })
}

// Not Found url 并且转到 对一个的处理
app.use((req, res, next) => { // 所有的请求都会经过这里
  console.log('all requests go through here')
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// devEnv错误处理
if(app.get('dev') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// prodEnv 错误处理

app.use((err, req, res) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

const server = socketHandler.createServer(app);

server.listen(3001, () => console.log('Example app listening on port 3001!'))