// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import markdownEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import tools from './assets/tools'
import Viewer from 'v-viewer'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(markdownEditor)
Vue.use(Viewer)
Vue.prototype.tools = tools

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
