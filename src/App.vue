<template>
  <v-app id="inspire">
    <router-view></router-view>
    <v-footer
      height="auto"
      color="primary lighten-1"
      class="higher_foot"
    >
      <v-layout
        justify-center
        row
        wrap
      >
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          flat
          round
        >
          {{ link }}
        </v-btn>
        <v-flex
          primary
          lighten-2
          py-3
          text-xs-center
          white--text
          xs12
        >
          &copy;2019 — <strong>{{ i18N.website_name }}</strong>
        </v-flex>
      </v-layout>
    </v-footer>
    <v-bottom-nav
      :active.sync="bottomNav"
      :color="color"
      :value="true"
      fixed
      dark
      shift
    >
      <v-btn dark v-on:click="clickButton(0)">
        <span>{{ i18N.index }}</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn dark v-on:click="clickButton(1)">
        <span>{{ i18N.post }}</span>
        <v-icon>send</v-icon>
      </v-btn>
      <v-btn dark v-on:click="clickButton(2)">
        <span>{{ i18N.login }}</span>
        <v-icon>plus_one</v-icon>
      </v-btn>
      <v-btn dark v-on:click="clickButton(3)">
        <span>{{ i18N.setting }}</span>
        <v-icon>info</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
import i18N from './assets/i18N/i18N'

export default {
  name: 'App',
  data () {
    return {
      currentRoute: window.location.pathname, // 当前路由地址
      bottomNav: 0, // 当前按下的导航按钮
      i18N: i18N, // i18N配置文件
      links: [ // 页脚链接
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us'
      ]
    }
  },
  computed: {
    color () {
      switch (this.bottomNav) {
        case 0:
          return 'blue-grey'
        case 1:
          return 'teal'
        case 2:
          return 'brown'
        case 3:
          return 'indigo'
      }
    }
  },
  methods: {
    clickButton: function (data) {
      switch (data) {
        case 0:
          this.$router.push({path: '/'})
          break
        case 1:
          this.$router.push({path: '/post'})
          break
        case 3:
          this.$router.push({path: '/my'})
          break
        default:
          this.$router.push({path: '/login'})
      }
    }
  },
  watch: {
    '$route' () {
      switch (window.location.hash) {
        case '#/':
          this.bottomNav = 0
          break
        case '#/post':
          this.bottomNav = 1
          break
        case '#/login':
          this.bottomNav = 2
          break
        case '#/my':
          this.bottomNav = 3
          break
        default:
      }
    }
  }
}
</script>

<style>
  .higher_foot {
    margin-bottom: 54px;
  }
</style>
