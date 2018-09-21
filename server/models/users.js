let users = []

function findInUsers(sessionId) { // 通过 sessionId 查找
  let index = -1
  for (let j = 0, len = users.length; j < len; j++) {
    if (users[j].sessionId === sessionId) {
       index = j
       break;
    }
  }
  return index;
}

function addUser(username, sessionId) { // 添加用户
  let index = findInUsers(sessionId)
  console.log(`index--${index}`)
  if (index === -1) {
    users.push({
      username,
      sessionId,
      socket: null
    })
  } else if (users[index].username !== username) { // sesstionid 存在但是名字不同，则后面的名字覆盖前面的名字
    username[index].username = username
  }

}

function setUserSocket(sessionId, socket) { // 更新用户socket
  let index = findInUsers(sessionId);
  if (index !== -1) {
    users[index].socket = socket; // 设置用户在哪个 socket 聊天中
  }
}

function findUser(sessionId) { // 查找
  let indext = findInUsers(sessionId)
  return index > -1 ? users[index] : null;
}

function otherUsers(sessionId) { // 其他人
  return users.filter(item => item.sessionId !== sessionId)
}

function allUsers() {
  return users;
}

function getUsername(sessionId) {
  users.forEach((item, index) => {
    if (item.sessionId === sessionId) {
      return users[index].username;
    }
  });
  return '404NotFound'
}


module.exports = {
  findInUsers,
  otherUsers,
  allUsers,
  getUsername,
  addUser,
  setUserSocket
}