const express = require('express')
const users = require('../models/users')
const records = require('../models/records');


const router = express.Router();

router.get('/hello', (req, res) => {
  res.send('hello,world!');
})
router.get('/login', (req, res) => {
  let username = req.query.username || req.params.username,
      sessionId = req.session.id;

  if (username) {
    req.session.username = username // 把username 保存到 session 上
    users.addUser(username, sessionId); // 存储用户
    res.json({
      msg: 'success',
      code: '200'
    })
  } else {
    res.json({
      msg: 'username is required',
      code: '201'
    })
  }
})

router.get('/logout', (req, res) => {
  if (req.session.username) {
    req.session.destroy(err => { // 服务器销毁 session 
      if (err) {
        console.log(err);
      }
    })

    res.clearCookie('iouser', {path: '/'}) // 客户端清除 cookie
    res.json({
      code: '200',
      msg: 'success'
    })
  }else { // 在登陆的时候我们已经控制了 username 一定会存在
    // 不存在 username 说明 没有进行过登陆
    res.json({
      code: '202',
      msg: 'log out error, you art not logged in'
    })
  }
})

router.get('/others', (req, res) => {
  let sessionId = req.session.id,
      username = res.session.username
  if (username && sessionId) {
    res.json({
      msg: 'success',
      code: '200',
      data: users.otherUsers(sessionId) // 返回数据到客户端
    })
  } else {
    res.json({
      msg: 'sessionId and username are not permitted to be null',
      code: '203'
    })
  }
})

router.get('/testlogin', (req, res) => { // 测试是否登陆了
  let username = req.session.username
  if (username) {
    res.json({
      msg: 'logged in',
      code: '200'
    })
  } else {
    res.json({
      msg: 'not logged in',
      code: '204'
    })
  }
})

router.get('/records', (req, res) => { // 获取所有记录
  records.getAllRecords() // promise 
  .then(docs => {
    res.json({
      msg: 'success',
      code: '200',
      data: docs
    })
  })
  .catch(err => {
    res.json({
      msg: 'get records error',
      code: '205'
    })
  })
})

router.get('/user', (req, res) => {
  let sessionId = req.session.id,
      username = req.session.username
  if (username) {
    res.json({
      msg: 'success',
      code: '200',
      data: {
        sessionId,
        username
      }
    })
  } else {
    res.json({
      msg: 'no logged in',
      code: '206'
    })
  }
})


module.exports = router;

