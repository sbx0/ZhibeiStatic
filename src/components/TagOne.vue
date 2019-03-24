<template>
  <div>
    <v-container>
      <v-layout align-center mt-3 mb-3>
        <v-flex sm12 text-xs-center>
          <v-chip
            @click="tools.go('/tag_tree')"
            outline label
          >
            {{data.name}}
          </v-chip>
          <p v-if="data.introduction != undefined">{{data.introduction}}</p>
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
import i18N from '@/assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'TagOne',
  data () {
    return {
      i18N: i18N,
      data: {},
      currentItem: 'tab-Question',
      items: [
        {
          title: i18N.table.question,
          index: 'Question',
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
          title: i18N.message_board,
          index: 'MessageBoard',
          icon: 'weekend'
        }
      ]
    }
  },
  created () {
    this.routeChange()
    this.getData()
  },
  watch: {
    '$route' () {
      this.routeChange()
    }
  },
  methods: {
    tabChange (index) {
      let path = this.$router.currentRoute.path
      let char = path.split('/')
      switch (index) {
        case 'Question':
          this.$router.push({path: char[0] + '/' + char[1] + '/' + char[2] + '/question'})
          break
        case 'Demand':
          this.$router.push({path: char[0] + '/' + char[1] + '/' + char[2] + '/demand'})
          break
        case 'Article':
          this.$router.push({path: char[0] + '/' + char[1] + '/' + char[2] + '/article'})
          break
        case 'MessageBoard':
          this.$router.push({path: char[0] + '/' + char[1] + '/' + char[2] + '/message_board'})
          break
        default:
          this.$router.push({path: '/question'})
          break
      }
    },
    routeChange () {
      let path = this.$router.currentRoute.path
      let char = path.split('/')
      switch (char[3]) {
        case 'question':
          this.currentItem = 'tab-Question'
          break
        case 'demand':
          this.currentItem = 'tab-Demand'
          break
        case 'article':
          this.currentItem = 'tab-Article'
          break
        case 'message_board':
          this.currentItem = 'tab-MessageBoard'
          break
        default:
          this.currentItem = 'tab-Question'
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
      let url = i18N.domain + '/tag/normal?id=' + _id
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
            _this.data = json.object
          } else {
            alert(_this.tools.statusCodeToAlert(status))
          }
          _this.loading = false
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
