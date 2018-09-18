import axios from 'axios'
// 在这里可以 定制一个 axios 实例 
// 使用 intercepter
export function login(vueInstance, username) {
  axios.get('api/login',{
    params: {
      username
    }
  })
  .then(({data}) => { // 这里为什么要是对象格式
    if (parserInt(data.code, 10) === 200) {
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