<template xmlns:v-touch="">
  <div id="app">
    <v-app id="inspire" v-touch:left="onSwipeLeft">
      <v-navigation-drawer
        fixed
        :clipped="$vuetify.breakpoint.mdAndUp"
        app
        v-model="drawer"
      >
        <v-list dense>
          <template v-for="item in items">
            <v-layout
              row
              v-if="item.heading"
              align-center
              :key="item.heading"
            >
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-center">
                <a href="#!" class="body-2 black--text">EDIT</a>
              </v-flex>
            </v-layout>
            <v-list-group
              v-else-if="item.children"
              v-model="item.model"
              :key="item.text"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                v-for="(child, i) in item.children"
                :key="i"
              >
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content v-if="item.text == 'Change Language'" @click="i18NChange(child.name)">
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-content v-else @click="tools.go(child.url)">
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
            <v-list-tile v-else :key="item.text" @click="tools.go(item.url)">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        color="blue darken-3"
        dark
        app
        :clipped-left="$vuetify.breakpoint.mdAndUp"
        fixed
      >
        <v-toolbar-title style="width: 300px" class="ml-0">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <span class="hidden-sm-and-down">{{i18N.website_name}}</span>
        </v-toolbar-title>
        <v-text-field
          flat
          solo-inverted
          prepend-icon="search"
          :label="i18N.search"
          class="hidden-sm-and-down"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon @click="tools.go('/demand')">
          <v-icon>home</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn icon large>
          <v-avatar size="32px" @click="tools.go('/my')">
            <img
              :src="i18N.domain+user.avatar"
            >
          </v-avatar>
        </v-btn>
      </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
      <v-btn
        fab
        bottom
        right
        color="pink"
        dark
        fixed
        @click.stop="sheet = !sheet"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-bottom-sheet v-model="sheet">
        <v-list>
          <v-subheader>{{i18N.post}}</v-subheader>
          <v-list-tile
            v-for="tile in tiles"
            :key="tile.title"
            @click="sheet = false;tools.go(tile.url)"
          >
            <v-list-tile-avatar>
              <v-avatar size="32px" tile>
                <img
                  :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
                  :alt="tile.title"
                >
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-bottom-sheet>
    </v-app>
  </div>
</template>

<script>
import i18N from './assets/i18N/i18N'
import $ from 'jquery'
import 'material-design-icons-iconfont'

export default {
  name: 'App',
  data () {
    return {
      i18N: i18N,
      i18NConfig: {
        value: 'zh_CN'
      }, // i18N配置文件
      user: {
        name: i18N.not + i18N.login,
        nickname: i18N.not + i18N.login,
        email: i18N.not + i18N.login,
        avatar: '/img/avatar-min-img.png',
        sex: i18N.not + i18N.login,
        introduction: i18N.not + i18N.login,
        birthday: i18N.not + i18N.login
      },
      sheet: false,
      tiles: [
        {img: 'keep.png', title: i18N.table.article, url: '/post'},
        {img: 'inbox.png', title: i18N.table.demand, url: '/post/demand'}
      ],
      dialog: false,
      drawer: null,
      items: [
        {icon: 'home', text: i18N.index, url: '/demand'},
        {icon: 'settings', text: i18N.setting},
        {icon: 'help', text: i18N.help},
        {icon: 'phonelink', text: i18N.download},
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: i18N.more,
          model: true,
          children: [
            {icon: 'people', text: i18N.login, url: '/login'}
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Change Language',
          model: false,
          children: i18N.lib
        }
      ]
    }
  },
  methods: {
    onSwipeLeft () {
      this.$router.go(-1)
    },
    i18NChange: function (name) {
      this.tools.setCookie('i18N_config', name, 30)
      location.reload()
    },
    getInfo () {
      let _this = this
      _this.loading = true
      $.ajax({
        type: 'get',
        url: i18N.domain + '/user/info',
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            if (json.user !== undefined) {
              _this.user = json.user
            }
            _this.loading = false
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    }
  },
  created () {
    this.i18NConfig = this.tools.getCookie('i18N_config')
    this.getInfo()
  }
}
</script>

<style>
  .container {
    padding: 0px !important;
  }
</style>
