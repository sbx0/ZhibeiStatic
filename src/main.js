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
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
import touch from 'vue-directive-touch'

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(markdownEditor)
Vue.use(Viewer)
Vue.prototype.tools = tools
Vue.use(touch)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
