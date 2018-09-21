<template>
  <div>
    <!-- 这里可以简化 -->
    <template v-for="(record, index) in records">
      <!-- 主要就是区分下是 自己与 others 显示的位置相反 -->
      <!-- others -->
      <div class="record" v-if="record.sessionId !== user.sessionId && record.sessionId" :key="index">
        <avatar class="avatar" :name="record.username"></avatar>
        <span class="name">{{record.username}}</span>
        <span class="msg">{{record.msg}}</span>
        <span class="time">{{record.time}}</span>
      </div>
      <!-- 自己 -->
      <div class="record-now" :key="index" v-else-if="user.sessionId === record.sessionId && user.sessionId !== ''">
        <avatar class="avatar" :name="record.username"></avatar>
        <span class="name">{{record.username}}</span>
        <span class="msg">{{record.msg}}</span>
        <span class="time">{{record.time}}</span>
      </div>
      <divider class="tip-msg" v-if="record.tip === true" :key="index">{{record.msg}}</divider>
    </template>
  </div>
</template>
<script>
import GroupChat from './GroupChat.js'
export default GroupChat;
</script>
<style lang="less">
@import './GroupChat.less';
</style>


