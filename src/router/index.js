import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import My from '../components/My'
import Login from '../components/Login'
import Article from '../components/Article'
import Post from '../components/Post'
import User from '../components/User'
import NotFound from '../components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
