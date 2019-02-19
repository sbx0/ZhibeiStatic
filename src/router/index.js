import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/Index';
import My from '../components/My';
import Login from '../components/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/my',
      name: 'My',
      component: My,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});
