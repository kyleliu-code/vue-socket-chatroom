<template>
  <div class="login-container">
    <div class="main">
      <header class="header">登陆</header>
      <group label-width="4.5em" label-margin-right="2em">
        <x-input v-model="username" title="用户名" placeholder="请输入用户名"></x-input>
        <x-button type="primary" text="登陆" @click.native="login"></x-button>
      </group>
    </div>
  </div>
</template>
<script>

  import Login from './Login.js'
  export default Login

</script>
<style lang="less">
  @import './Login.less';
</style>
