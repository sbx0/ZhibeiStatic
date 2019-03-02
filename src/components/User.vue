<template>
  <div>
    <div>
      <v-toolbar
        tabs
        dense
        scroll-off-screen
      >
        <v-avatar class="mr-3">
          <img v-if="userData.avatar !== undefined" :src="i18N.domain+userData.avatar" alt="avatar">
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
            @click="tabChange(item.index)"
          >
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </v-toolbar>
      <div class="text-xs-center" v-if="loading">
        <v-progress-circular
          indeterminate
          color="primary"
          class="loading-control"
        ></v-progress-circular>
      </div>
      <router-view v-else></router-view>
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
          title: i18N.table.article,
          index: 'Article'
        },
        {
          title: i18N.table.demand,
          index: 'Demand'
        },
        {
          title: i18N.table.comment,
          index: 'Comment'
        },
        {
          title: i18N.message_board,
          index: 'MessageBoard'
        }
      ]
    }
  },
  methods: {
    tabChange (index) {
      let path = this.$router.currentRoute.path
      let char = path.split('/')
      switch (index) {
        case 'Article':
          this.$router.push({path: char[0] + '/' + char[1] + '/' + char[2] + '/article'})
          break
        case 'Demand':
          this.$router.push({path: char[0] + '/' + char[1] + '/' + char[2] + '/demand'})
          break
        case 'Comment':
          this.$router.push({path: char[0] + '/' + char[1] + '/' + char[2] + '/comment'})
          break
        case 'MessageBoard':
          this.$router.push({path: char[0] + '/' + char[1] + '/' + char[2] + '/message_board'})
          break
        default:
          this.$router.push({path: '/'})
          break
      }
    },
    getData () {
      let _this = this
      let _id = this.$route.params.id
      if (_id === undefined) {
        this.$router.push({path: '/NotFound'})
        return false
      }
      _this.loading = true
      let url = i18N.domain + '/user/normal?id=' + _id
      $.ajax({
        type: 'get',
        url: url,
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
    let path = this.$router.currentRoute.path
    let char = path.split('/')
    switch (char[3]) {
      case 'article':
        this.currentItem = 'tab-Article'
        break
      case 'demand':
        this.currentItem = 'tab-Demand'
        break
      case 'comment':
        this.currentItem = 'tab-Comment'
        break
      case 'message_board':
        this.currentItem = 'tab-MessageBoard'
        break
      default:
        this.currentItem = 'tab-Article'
        break
    }
    this.getData()
  }
}
</script>

<style scoped>
  .loading-control {
    margin: 50px 50px;
  }
</style>
