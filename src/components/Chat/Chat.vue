<template>
  <div class="container">
    <x-header :left-options="{showBack: true, preventGoBack: true, backText: '退出登陆'}" :right-options="{showMore: true}"
      @on-click-back="logout" @on-click-more="showMenus = true">
      {{talkingTo === -1 ? '群聊': people[talkingTo].label}}
    </x-header>

    <!-- 聊天标签页切换  -->
    <tab>
      <tab-item @on-item-click="talkToThis(-1)" selected>
        群聊
      </tab-item>
      <template v-for="(personIndex, index) in talkToPeople">
        <tab-item :key="index" @on-item-click="talkToThis(personIndex)" :selected="talkingTo === personIndex ? true : false">
          {{people[personIndex].label}}
        </tab-item>
      </template>
    </tab>

    <!-- 聊天标签页聊天记录(群聊) -->
    <div class="chat-container" v-if="talkingTo === -1">
      <group-chat :user="user" :records="records"></group-chat>
    </div>

    <!-- 聊天输入框 -->
    <div class="bottom-input">
      <input type="text" class="input" v-model="message" placeholder="输入...">
      <x-button class="button" type="primary" @click.native="sendMsg">发送</x-button>
    </div>
  </div>
</template>
<script>
  import Chat from './Chat.js'
  export default Chat

</script>
<style lang="less">
@import './Chat.less';
</style>

