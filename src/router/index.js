import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import My from '../components/My'
import Login from '../components/Login'
import Article from '../components/Article'
import Post from '../components/Post'
import User from '../components/User'
import NotFound from '../components/NotFound'
import Upload from '../components/Upload'

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
      component: My,
      children: [
        {
          // 当 /my/upload 匹配成功，
          // Upload 会被渲染在 My 的 <router-view> 中
          path: 'upload',
          component: Upload
        }
      ]
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
      path: '/upload',
      name: 'Upload',
      component: Upload
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
