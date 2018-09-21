import * as api from '@/api/api'
import * as types from '../mutation-types'
import { stat } from 'fs';

const initialState = {
  records: [], // [{sessionId, username, msg,time}...]
};

const getters = {
  records: state => state.records,
  // privateGroup: state => state.privateGroup
};


const mutaions = {  // mutations 唯一改变 state
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
  // 增加记录
  addRecord({ commit }, record) {
    commit(types.ADD_RECORD, record); // 时间类型， 以及payload
  }
};


export default {
  state: initialState,
  getter,
  mutaions,
  actions
}

