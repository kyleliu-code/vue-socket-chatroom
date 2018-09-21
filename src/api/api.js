import axios from 'axios'
// 在这里可以 定制一个 axios 实例 
// 使用 intercepter
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