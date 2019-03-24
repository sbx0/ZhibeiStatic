<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-container>
      <v-layout mt-3 mb-3 wrap>
        <v-flex xs12 text-xs-center>
          <v-badge
            color="success"
            bottom
            overlap
            class="mb-3"
            transition
          >
            <!--<template v-slot:badge>-->
              <!--<v-icon-->
                <!--dark-->
                <!--small-->
              <!--&gt;-->
                <!--school-->
              <!--</v-icon>-->
            <!--</template>-->
            <v-avatar>
              <img v-if="userData.avatar !== undefined" :src="i18N.domain+userData.avatar" alt="avatar">
            </v-avatar>
          </v-badge>
          <h2 v-if="userData.nickname != ''">{{userData.nickname}}#{{userData.name}}</h2>
          <h2 v-else>{{userData.name}}</h2>
          <span v-if="userData.introduction != undefined">{{userData.introduction}}</span>
        </v-flex>
        <v-flex xs12 text-xs-center>
          <p>Lv.{{userData.level}}</p>
        </v-flex>
        <v-flex xs12 v-if="certification !== null && !loading">
          <v-card
            class="mx-auto text-xs-center"
            max-width="400"
          >
            <v-sheet
              dark
              class="v-sheet--offset mx-auto mb-3"
              color="success"
              elevation="12"
              max-width="calc(100% - 32px)"
            >
              <h3>{{certification.type}}</h3>
            </v-sheet>
            <v-card-text class="pt-0">
              <div class="title font-weight-light mb-2">{{certification.info}}</div>
              <div class="subheading font-weight-light grey--text"></div>
              <v-divider class="my-2"></v-divider>
              <v-icon
                class="mr-2"
                small
              >
                mdi-clock
              </v-icon>
              <span
                class="caption grey--text font-weight-light">{{certification.endTime+' '+i18N.before_can_use}}</span>
            </v-card-text>
          </v-card>
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
      certification: null,
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
          this.$router.push({path: '/answer'})
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
    getCertification () {
      let _this = this
      _this.loading = true
      $.ajax({
        type: 'get',
        url: i18N.domain + '/certification/user?id=' + _this.$route.params.id,
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            let type = _this.i18N.certification_type
            for (let i = 0; i < type.length; i++) {
              if (type[i].value === json.certification.type) {
                json.certification.type = type[i].text
              }
            }
            _this.certification = json.certification
            _this.loading = false
          } else {
            _this.loading = false
          }
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
        case 'message':
          this.currentItem = 'tab-MessageSend'
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
    }
  },
  created () {
    this.routeChange()
    this.getData()
    this.getCertification()
  }
}
</script>

<style scoped>
  .loading-control {
    margin: 50px 50px;
  }
</style>
