import axios from 'axios'
// 在这里可以 定制一个 axios 实例 
// 使用 intercepter, 用来处理状态吗
/**
 * @export function login
 * @param {Object} vueInstance vue实例
 * @param {String} username 用户名
 */
export function login(vueInstance, username) {
  axios.get('/api/login',{
    params: {
      username
    }
  })
  .then(({data}) => { // 这里为什么要是对象格式
    console.log(data)
    if (parseInt(data.code, 10) === 200) {
      vueInstance.$router.push('/chat');
    } else {
      vueInstance.$vux.alert.show({
        title: data.msg
      })
    }
  })
  .catch(err => {
    console.log(err)
  })
}


/**
 *
 *
 * @export
 * @param {*} to
 * @param {*} from
 * @param {*} next
 * @param {string} [loginNextRoute=''] 已登录的跳转链接
 * @param {string} [logoutNextRoute=''] 未登录的跳转链接
 * @param {string} [ErrorNextRoute=''] 异步请求客户端错误跳转链接
 */
export function checkLogin(to, from, next, loginNextRoute='', logoutNextRoute='',ErrorNextRoute) {
  axios.get('/api/testlogin')
  .then(({data}) => {
    if (parseInt(data.code, 10) === 200) {
      loginNextRoute === '' ? next() : next(loginNextRoute);
    } else { // 这里一般应该是跳转到登陆页面
      logoutNextRoute === '' ? next() : next(logoutNextRoute);
    }
  })
  .catch(err => { // 可以跳转到 404 页面
    ErrorNextRoute === '' ? next(ErrorNextRoute) : next('/login');
  });
}

export function logout(vueInstance) {
  axios.get('/api/logout')
  .then(({data}) => {
    if (parseInt(data.code, 10) === 200) { // code 判断可以放在 interceptor中
      vueInstance.$router.push('/login');
    } else {
      vueInstance.$vux.alert.show({
        title: data.msg
      })
    }
  })
  .catch(err => {
    vueInstance.$vue.alert.show({
      title: err
    });
  });
}


export function getUser(cb, errorcb) {
  axios.get('/api/user')
  .then(({ data }) => {
    if (parseInt(data.code,10) === 200) {
      console.log(`data---${data}`)
      cb(data.data);
    } else {
      console.log(data.msg);
    }
  })
  .catch(err => {
    typeof errorCb === 'function' && errorCb(err);
  });
}

/**
 *取得在线人列表
 *
 * @export
 * @param {*} cb successCb
 * @param {*} errorCb
 */
export function getOthers(cb, errorCb) {
  axios.get('/api/others')
  .then(({ data }) => {
    if (parseInt(data.code,10) === 200) { // success
      cb(data.data);
    } else {
      console.log(data.msg);
    }
  })
  .catch(err => {
    errorCb(err);
  });
};

/**
 *获取所有群聊天记录
 *
 * @export
 * @param {*} cb
 * @param {*} errorCb
 */
export function getRecords(cb, errorCb) {
  axios.get('/api/records')
  .then(({data}) => {
    if (parseInt(data.code, 10) === 200) {
      cb(data.data)
    } else {
      console.log(data.msg);
    }
  })
  .catch(err => {
    errorCb(err);
  });
}