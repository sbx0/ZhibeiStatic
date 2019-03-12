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
import AvatarUpload from '@/components/AvatarUpload'
import ArticleSearch from '@/components/ArticleSearch'
import LostPassword from '@/components/LostPassword'
import ChangePassword from '@/components/ChangePassword'
import MessageSend from '@/components/MessageSend'
import MessageList from '@/components/MessageList'

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'article',
          component: ArticleList,
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'demand',
          component: DemandList,
          meta: {
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/my',
      name: 'My',
      component: My,
      children: [
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
      path: '/search/article',
      name: 'ArticleSearch',
      component: ArticleSearch,
      meta: {
        keepAlive: true
      }
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
      path: '/upload/avatar',
      name: 'AvatarUpload',
      component: AvatarUpload,
      props: {
        w: 1,
        h: 1
      }
    },
    {
      path: '/upload/cover',
      name: 'CoverUpload',
      component: AvatarUpload,
      props: {
        w: 16,
        h: 9
      }
    },
    {
      path: '/lostPassword',
      name: 'LostPassword',
      component: LostPassword
    },
    {
      path: '/verify/:md5',
      name: 'Verify',
      component: ChangePassword
    },
    {
      path: '/message/send/:id',
      name: 'MessageSend',
      component: MessageSend
    },
    {
      path: '/message/list',
      name: 'MessageList',
      component: MessageList
    },
    {
      path: '/NotFound',
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

Vue.use(Router)
