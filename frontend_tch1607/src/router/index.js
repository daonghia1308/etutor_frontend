import Vue from 'vue'
import Router from 'vue-router'
import LoginForm from '@/components/LoginForm'
import Home from '@/components/Homepage'
import navbar from '@/components/layouts/navbar'
import Users from '@/components/ManageUser'
import Class from '@/components/ManageClass'
import Chat from '@/components/chatPage'
import listClass from '@/components/listClass'
import classDetailPage from '@/components/classPage'
Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm
    },
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        'navbar': navbar
      }
    },
    {
      path: '/users',
      name: 'Users',
      components: {
        default: Users,
        'navbar': navbar
      }
    },
    { path: '/class', name: 'Classes', components: { default: Class, 'navbar': navbar } },
    { path: '/chat', name: 'Chat page', components: { default: Chat, 'navbar': navbar } },
    { path: '/listClass', name: 'listClass', components: { default: listClass, 'navbar': navbar } },
    { path: '/detail/:id', name: 'Class Detail', components: { default: classDetailPage, 'navbar': navbar } },
  ]

})
router.beforeEach((to, from, next) => {
  if (to.name != 'LoginForm' && !sessionStorage.getItem('token')) {
    next({ name: 'LoginForm' })
  }
  if (sessionStorage.getItem('token')) {
    if (to.name == 'Home' && JSON.parse(sessionStorage.getItem("userInfo"))["role"] == 2) {
      next({ name: 'listClass' })
    }
    if (to.name == 'Home' && JSON.parse(sessionStorage.getItem("userInfo"))["role"] == 3) {
      next({ path: `/detail/${JSON.parse(sessionStorage.getItem("userInfo"))["class"]}` })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})
export default router

