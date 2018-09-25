import {
  Divider,
  Actionsheet,
  XHeader,
  TransferDom,
  Popup,
  Tab,
  TabItem,
  Tabbar,
  TabbarItem,
  XButton,
  XInput,
  Grid,
  GridItem,
  Group
} from 'vux'; // 引入 vux 相关组件
import moment from 'moment';
import { logout } from '@/api/api.js';
import GroupChat from '../GroupChat';
import { mapActions, mapGetters } from 'vuex';
// import store from '@/store';
export default {
  data() {
    return {
      talkingTo: -1,
      // talkToPeople: [],
      // user: {},
      // records: [],
      message: ''
    }
  },
  methods: {

    ...mapActions([
      'getUser',
      'addRecord',
      'getRecords'
    ]),
    logout() { //退出登陆
      console.log('logout')
      this.$vux.confirm.show({
        title: '确定要退出聊天室吗?',
        onConfirm: () =>{
          logout(this);
        }
      });
    },
    sendMsg() {
      if (this.message.trim() !== '') { // 每次发送信息的时候建立 socket 连接
        const socket = window.io('/'); // 与 哪个url 建立 socket 链接
        let time = moment().format('YYYY/MM/DD HH:mm:ss');

        if (this.talkingTo !== -1) { // 非群聊
          let sessionId = this.people[this.talkingTo].value;
          // 
          // socket.emit('private', {})

        } else { // 群聊
          console.log('群聊')
          socket.emit('broadcast', { // 发送消息
            msg: this.message,
            time
          });

          this.addRecord({ // 作消息记录， 页面展示
            username: this.user.username,
            sessionId: this.user.sessionId,
            msg: this.message,
            time
          });

          // clear input 
          this.message = '';
        }
      } else {
        this.$vux.alert.show({
          title: '发送的消息不能为空'
        });
      }
    },
    talkToThis() {
      this.setTalkingTo(index);
    },
    
  },
  computed: {
    ...mapGetters([
      // 'people',
      // 'talkingTo',
      'talkToPeople',
      'records',
      'user'
    ])
  },
  // store: store,
  mounted() {
    const socket = window.io('/'); // 创建一个 client socket 并与 目的路径的socket connection
    const that = this; // 可以用 arrow fun
    let time = moment().format('YYYY/MM/DD HH:mm:ss') // 获取当前时间
    // 告诉socket server该用户登录的动作
    // server side 已经订阅了该事件
    socket.emit('login', {
      time
    })

    // server side 会触发
    socket.on('someOneLogin', ({
      user,
      msg
    }) => {
      that.addPeople({
        label: user.username, // 进来人的 名字
        value: user.sessionId, // 进来的是谁
        msgs: [] // 进来的人说过什么话
      });
      that.addRecord({
        username: '',
        sessionId: '',
        tip: true,
        msg,
        time
      })
    })

    // server side 触发该事件(// 监听socket server 其他用户退出的消息)
    socket.on('quit', data => {
      // that.addRecord({
      //   username: '',
      //   sessionId: '',
      //   tip: true,
      //   msg: data.msg,
      //   time: data.time
      // })
    })

    // socket server 广播

    socket.on('broadcast', data => {
      console.log('broadcast');
      if (data.user.sessionId !== that.user.sessionId) {
        that.addRecord({
          username: data.user.name,
          sessionId: data.user.sessionId,
          msg: data.msg,
          time: data.time
        });
      }
    });

    // 监听私聊信息

    // 聊天室成员
    // this.getOthers();
    this.getRecords();
    this.getUser();

  },

  components: {
    Divider,
    Actionsheet,
    XHeader,
    TransferDom,
    Popup,
    Tab,
    TabItem,
    Tabbar,
    TabbarItem,
    XButton,
    XInput,
    Grid,
    GridItem,
    Group,
    GroupChat
  }
}
