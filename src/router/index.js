import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      alia: '/login'
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    }
  ]
})
