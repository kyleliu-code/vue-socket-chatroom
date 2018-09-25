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
  getOthers({
    commit
  }) {
    // 异步请求， loading
    commit(types.START_LOADING);
    api.getOthers(data => {
      commit(types.GET_OTHERS_SUCCESS, data);
      // 关闭loading
      commit(types.END_LOADING);
    }, err => {
      commit(types.GET_OTHERS_FAILURE, err);
      commit(types.END_LOADING);
    });
  },

  getUser(context) {
    context.commit(types.START_LOADING);
    api.getUser(user => {
      context.commit(types.GET_USERNAME_SUCCESS, user);
      context.commit(types.END_LOADING);
    });
  }
}

const mutations = {
  // 成功的到其他人列表
  [type.GET_OTHERS_SUCCESS](state, others) {
    if (others.length > 0) {
      state.people.splice(0);
      others.map(other => {
        state.people.push({
          label: other.username,
          value: other.sessionId,
          msgs: []
        });
        return true;
      });
    }
    // 得到其他人列表失败
  },
  [types.GET_OTHERS_FAILURE](state) {
    state.people = [];
    state.talkingTo = -1;
    state.talkToPeople = [];
  },
  // 设置正在聊天的人
  [types.SET_TALKING_TO](state, value) {
    state.talkingTo = value;
  },
  // 关闭某个聊天室
  [types.REDUCE_TALK_TO_PEOPLE](state, value) {
    let index = null;
    for (let i = 0; i < state.talkToPeople.length; i++) {
      if (state.talkToPeople[i] === value) {
        index = i;
      }
    }
    if (index !== null) {
      state.talkToPeople.splice(index, 1);
    }
  },

  // 怎加一个私聊 聊天室
  [types.ADD_TALK_TO_PEOPLE](state, index) {
    state.talkToPeople.push(index);
  },
  // 增加一个聊天室的用户
  [types.ADD_PEOPLE](state, user) {
    state.people.push(user);
  },

  [types.GET_USERNAME_SUCCESS](state, user) {
    state.user = { ...user
    };
  },
  [types.GET_USERNAME_FAILURE](state){
    state.user = {
      username: '',
      sessionId: ''
    };
  },
  // [types.ADD_PRIVATE_RECORD](state, privateRecord) {
  //   let groupIndex = 
  // }

}

export default {
  state: initialState,
  getters,
  actions,
  mutations
}
