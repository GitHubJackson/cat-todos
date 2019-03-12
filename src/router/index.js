import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import TodoList from '@/views/TodoList'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/todolist',
      component: TodoList
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
