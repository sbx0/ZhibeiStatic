import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import My from '@/components/My'
import Login from '@/components/Login'
import ArticleOne from '@/components/ArticleOne'
import Post from '@/components/Post'
import User from '@/components/User'
import NotFound from '@/components/NotFound'
import Upload from '@/components/Upload'
import ArticleList from '@/components/ArticleList'
import UserData from '@/components/UserData'
import CommentList from '@/components/CommentList'
import CertificationData from '@/components/CertificationData'
import DemandPost from '@/components/DemandPost'
import DemandList from '@/components/DemandList'
import DemandOne from '@/components/DemandOne'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'article',
          component: ArticleList
        },
        {
          path: 'demand',
          component: DemandList
        }
      ]
    },
    {
      path: '/my',
      name: 'My',
      component: My,
      children: [
        {
          path: 'upload',
          component: Upload
        },
        {
          path: 'data',
          component: UserData
        },
        {
          path: 'certification',
          component: CertificationData
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
      name: 'ArticleOne',
      component: ArticleOne
    },
    {
      path: '/demand/:id',
      name: 'DemandOne',
      component: DemandOne
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User,
      children: [
        {
          path: 'article',
          component: ArticleList
        },
        {
          path: 'demand',
          component: DemandList
        },
        {
          path: 'comment',
          component: CommentList
        },
        {
          path: 'message_board',
          component: CommentList
        }
      ]
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/post/demand',
      name: 'DemandPost',
      component: DemandPost
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
