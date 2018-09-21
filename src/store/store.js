import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';
import people from './modules/people';
import records from './modules/records';
// import records from './modules/records';

Vue.use(Vuex); // 使用 vuex 

const debug = process.env.NODE_ENV !== 'production';

const initialState = {
  isLoading: false,
  menu: false
};

const getters = {
  loading: state => state.isLoading
};

const actions = { // 可以用来处理异步
  startLoading({ commit }) {
    commit(types.START_LOADING);
  },
  endLoading({ commit }) {
    commit(types.END_LOADING);
  }
};


const mutations = { // 同步改变
  // 开始 loading
  [types.START_LOADING](state) {
    state.isLoading = true;
  },
  // 结束 loading 

  [types.END_LOADING](state) {
    state.isLoading = false;
  }
};

export default new Vuex.Store({
  state: initialState,
  getters,
  actions,
  mutations,
  modules: {
    people,
    records
  },
  strict: debug
});

