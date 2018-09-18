const mongoose = require('mongoose');
const bluebird = require('bluebird');
const dbUrl = require('../config/db').url; // 这是库地址

// connect mongodb
mongoose.Promise = bluebird
mongoose.connect(dbUrl, {useNewUrlParser: true})
const db = mongoose.connection

db.on('error', err => {
  console.log(err)
}); // 监听

const record = new mongoose.Schema({ // 定义表结构
  username: String,
  sessionId: String,
  msg: String,
  time: String
})

const RecordModel = mongoose.model('records', record); // 创建一张表

function addRecord(username, sessionId, msg, time) {
  if (!username || !msg || !sessionId || !time) {
    return false;
  }

  let oneRecord = new RecordModel({ // 创建一条记录
    username,
    sessionId,
    msg,
    time
  });

  oneRecord.save((err, docs) => {
    if (err) {
      console.log(err);
    }
    console.log(docs)
  });

  return true; //正常记录后 true flag
}

function getAllRecords() {
  return RecordModel.find({}).exec();
}

module.exports = {
  addRecord,
  getAllRecords
}
