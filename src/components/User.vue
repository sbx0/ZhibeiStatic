<template>
  <div>
    <v-container>
      <v-layout align-center mt-3 mb-3>
        <v-flex sm12 text-xs-center>
          <v-avatar class="mb-3">
            <img v-if="userData.avatar !== undefined" :src="i18N.domain+userData.avatar" alt="avatar">
          </v-avatar>
          <h2 v-if="userData.nickname != ''">{{userData.nickname}}#{{userData.name}}</h2>
          <h2 v-else>{{userData.name}}</h2>
          <p v-if="userData.introduction != undefined">{{userData.introduction}}</p>
        </v-flex>
      </v-layout>
    </v-container>
    <v-divider></v-divider>
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
        <v-icon>{{item.icon}}</v-icon>
        &nbsp;
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <div class="text-xs-center" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="loading-control"
      ></v-progress-circular>
    </div>
    <router-view v-else></router-view>
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
      currentItem: 'tab-Answer',
      items: [
        {
          title: i18N.table.answer,
          index: 'Answer',
          icon: 'assignment'
        },
        {
          title: i18N.table.demand,
          index: 'Demand',
          icon: 'assignment'
        },
        {
          title: i18N.table.article,
          index: 'Article',
          icon: 'book'
        },
        {
          title: i18N.message,
          index: 'MessageSend',
          icon: 'send'
        },
        {
          title: i18N.table.question,
          index: 'Question',
          icon: 'assignment'
        },
        {
          title: i18N.table.comment,
          index: 'Comment',
          icon: 'comment'
        },
        {
          title: i18N.message_board,
          index: 'MessageBoard',
          icon: 'weekend'
        }
      ]
    }
  },
  methods: {
    tabChange (index) {
      let path = this.$router.currentRoute.path
      let char = path.split('/')
      switch (index) {
        case 'Answer':
          this.$router.push({path: char[0] + '/' + char[1] + '/' + char[2] + '/answer'})
          break
        case 'Question':
          this.$router.push({path: char[0] + '/' + char[1] + '/' + char[2] + '/question'})
          break
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
        case 'MessageSend':
          this.$router.push({path: char[0] + '/' + char[1] + '/' + char[2] + '/message'})
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
    },
    routeChange () {
      let path = this.$router.currentRoute.path
      let char = path.split('/')
      switch (char[3]) {
        case 'answer':
          this.currentItem = 'tab-Answer'
          break
        case 'question':
          this.currentItem = 'tab-Question'
          break
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
    }
  },
  watch: {
    '$route' () {
      this.routeChange()
      this.getData()
    }
  },
  created () {
    this.routeChange()
    this.getData()
  }
}
</script>

<style scoped>
  .loading-control {
    margin: 50px 50px;
  }
</style>
