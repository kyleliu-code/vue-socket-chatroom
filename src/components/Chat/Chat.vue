<template>
  <div class="contaner">
    <x-header 
      :left-options="{showBack: true, preventGoBack: true, backText: '退出登陆'}"
      :right-options="{showMore: true}"
      :@on-click-back="logout"
      @on-click-more="showMenus = true">
        {{talkingTo === -1 ? '群聊': people[talkingTo].label}}
      </x-header>
      <tab>
        <tab-item @on-item-click="talkToThis(-1)" selected>
          群聊
        </tab-item>
        <template v-for="(personIndex, index) in talkToPeople" >
            <tab-item 
              :key="index" 
              @on-item-click="talkToThis(personIndex)"
              :selected="talkingTo === personIndex ? true : false">
                {{people[personIndex].label}}
              </tab-item>
        </template>
      </tab>
  </div>
</template>
<script>
import Chat from './Chat.js'
export default Chat
</script>
