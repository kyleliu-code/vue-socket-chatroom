import * as api from '@/api/api'
import * as types from '../mutation-types'
import { stat } from 'fs';

const initialState = {
  records: [], // [{sessionId, username, msg,time}...]
};

const getters = {
  records: state => state.records,
  privateGroups: state => state.privateGroup
};


const mutations = {  // mutations 唯一改变 state
  [types.GET_RECORDS_SUCCESS](state, records) {
    if (records.length > 0) {
      state.records.splice(0) ; // 清空之前的數據
      // state.records.length = 0;
      // state.records = [...records]
      records.forEach(item => state.records.push(item));


    }
  },
  [types.GET_RECORDS_FAILURE] (state) {
    state.records = []; // 请求失败，清空所有的数据
  },
  [types.ADD_RECORD](state, record) {
    state.records.push(record);
  }

};

const actions = {
  // 得到群聊天记录
  getRecords({ commit }) {
    commit(types.START_LOADING);
    api.getRecords(data => {
      commit(types.GET_RECORDS_SUCCESS, data);
      // 获取记录后 结束 loading
      commit(types.END_LOADING);
    }, err => {
      commit(types.GET_RECORDS_FAILURE);
      // 关闭 loading
      commit(types.END_LOADING);
    });
  },
  // 增加记录
  addRecord({ commit }, record) {
    commit(types.ADD_RECORD, record); // 时间类型， 以及payload
  }
};


export default {
  state: initialState,
  getters,
  mutations,
  actions
}

