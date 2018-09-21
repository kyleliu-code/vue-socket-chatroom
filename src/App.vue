<template>
  <div id="app">
    <router-view/>
    <loading
      :show="isLoading"
      :text='text'
    > </loading>
  </div>
</template>

<script>
import store from './store'
import {Loading } from 'vux'
export default {
  name: 'App',
  data() {
    return {
      text: 'Loading'
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  store,
  components: {
    Loading 
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less'; // 这里
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   /* margin-top: 60px; */
// }
html, body, #app {
  height: 100%;
}

body {
    font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
    margin: 0px;
    padding: 0px;
}
</style>
