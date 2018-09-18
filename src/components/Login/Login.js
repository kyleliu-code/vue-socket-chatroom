import {
  Group,
  XInput,
  XButton,
  Cell
} from 'vux'
import { login } from '@/api/api.js'
export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    login() {
      let username = this.username.trim();
      // 用户名 校验函数 可以放在配置文件中
      if (username !== '') {
        // this.$router.push('/chat');
        login(this, username)
      } else {
        this.$vux.alert.show({
          title: '用户名不能为空'
        })
      }
    }
  },
  components: {
    Group,
    XInput,
    XButton,
    Cell
  }
}