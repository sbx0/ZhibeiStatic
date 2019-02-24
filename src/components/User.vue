<template>
  <div>
    <div class="text-xs-center" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="loading-control"
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-toolbar
        tabs
      >
        <v-avatar class="mr-3">
          <img :src="i18N.domain+userData.avatar" alt="avatar">
        </v-avatar>
        <v-toolbar-title v-if="userData.nickname != null">{{userData.nickname}}@{{userData.name}}</v-toolbar-title>
        <v-toolbar-title v-else>@{{userData.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-tabs
          slot="extension"
          v-model="currentItem"
          color="transparent"
          fixed-tabs
          slider-color="yellow"
        >
          <v-tab
            v-for="(item,key) in items"
            :key="key"
            :href="'#tab-' + item.index"
          >
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </v-toolbar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'User',
  data () {
    return {
      i18N: i18N, // i18N配置文件
      loading: true, // 是否加载中
      userData: {
        name: i18N.loading
      },
      currentItem: 'tab-Article',
      items: [
        {
          title: i18N.article,
          index: 'Article'
        },
        {
          title: 'Coming Soon',
          index: 'Ask'
        }
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    getData () {
      let _this = this
      let _id = this.$route.params.id
      if (_id === undefined) {
        this.$router.push({path: '/NotFound'})
        return false
      }
      _this.loading = true
      $.ajax({
        type: 'get',
        url: i18N.domain + '/user/id/' + _id,
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            _this.userData = json.object
          } else {
            alert(_this.tools.statusCodeToAlert(status))
          }
          _this.loading = false
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    }
  },
  watch: {
    '$route' () {
      this.getData()
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
  .loading-control {
    margin: 50px 50px;
  }
</style>
