import * as api from '@/api/api.js';
import * as types from '../mutation-types.js';

const initialState = { // 状态存储位置
  people: [], //[{label:name, value: seesionId, msgs:[...]}]
  talkingTo: -1, // -1 表示群聊， 控制label 显示
  talkToPeople: [],
  user: { // 当前登陆人的信息
    username: '',
    sessionId: '',
  }
};

const getters = { // 过滤器, 这里似乎并未进行过滤
  people: state => state.people,
  talkingTo: state => state.talkingTo,
  talkToPeople: state => state.talkToPeople,
  user: state => state.user
};

const actions = { // 状态异步修改
  // 得到其他人列表
  // getOthers({commit}) {
  //   // 异步请求， loading
  //   commit(types.START_LOADING);
  //   api.getOthers(data => {
  //     commit(types.GET_OTHERS_SUCCESS, data);
  //     // 关闭loading
  //     commit(types.END_LOADING);
  //   });
  // },

  getUser(context) {
    context.commit(types.START_LOADING);
    api.getUser(user => {
      context.commit(types.GET_USERNAME_SUCCESS, user);
      context.commit(types.END_LOADING);
    });
  }
}

const mutations = { 
  [types.GET_USERNAME_SUCCESS](state, user) {
    state.user = {...user};
  }
}

export default {
  state: initialState,
  getters,
  actions,
  mutations
}