<template>
  <v-list two-line>
    <div class="text-xs-center" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="loading-control"
      ></v-progress-circular>
    </div>
    <template v-for="(item) in data" v-else>
      <v-card
        v-bind:key="item.id"
        class="mb-3"
      >
        <v-img
          :src="item.cover"
          aspect-ratio="2.75"
          @click="tools.go('/demand/'+item.id)"
        ></v-img>
        <v-card-title
          primary-title
          @click="tools.go('/demand/'+item.id)"
        >
          <div>
            <h3>{{item.title}}</h3>
            <div>
              {{tools.timeClick(item.endTime)}}
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-list-tile
            class="grow"
          >
            <v-list-tile-avatar
              color="grey darken-3"
              @click="tools.go('/user/'+item.poster.id+'/demand')"
            >
              <v-img
                class="elevation-6"
                :src="i18N.domain+item.poster.avatar"
              ></v-img>
            </v-list-tile-avatar>
            <v-list-tile-content
              @click="tools.go('/user/'+item.poster.id+'/demand')"
            >
              <v-list-tile-title v-if="item.poster.nickname != ''">{{item.poster.nickname}}</v-list-tile-title>
              <v-list-tile-title v-else>{{item.poster.name}}</v-list-tile-title>
            </v-list-tile-content>
            <v-layout
              align-center
              justify-end
              @click="tools.go('/demand/'+item.id)"
            >
              <span class="subheading">{{item.budget}}</span>
              <v-icon>attach_money</v-icon>
            </v-layout>
          </v-list-tile>
        </v-card-actions>
      </v-card>
    </template>
    <v-btn block @click="readMore()">{{i18N.read_more}}</v-btn>
  </v-list>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'DemandList',
  data () {
    return {
      i18N: i18N, // i18N配置文件
      loading: true, // 是否加载中
      page: 1, // 当前页数
      size: 10, // 每页条数
      totalPage: 0, // 总页数
      totalElements: 0, // 总条数
      attribute: 'time', // 按什么排序
      direction: 'DESC', // 倒序
      data: [], // 文章数据
      show: false,
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ]
    }
  },
  methods: {
    readMore: function () {
      let _this = this
      let url = i18N.domain +
          '/demand/normal/list?page=' + (_this.page + 1) +
          '&size=' + _this.size +
          '&attribute=' + _this.attribute +
          '&direction=' + _this.direction
      let path = _this.$router.currentRoute.path
      let pathRegExp = new RegExp('.*?((?:[a-z][a-z]+)).*?((?:[a-z][a-z]+))')
      let pathM = pathRegExp.exec(path)
      if (pathM != null) {
        let word1 = pathM[1]
        let word2 = pathM[2]
        path = '/' + word1.replace(/</, '&lt;') + '/' + word2.replace(/</, '&lt;')
      }
      if (path === '/user/demand') {
        let id = '-1'
        let idRegExp = new RegExp('.*?(\\d+)')
        let idM = idRegExp.exec(_this.$router.currentRoute.path)
        if (idM != null) {
          id = idM[1].replace(/</, '&lt;')
        }
        url = i18N.domain +
            '/demand/user?id=' + id +
            '&page=' + (_this.page + 1) +
            '&size=' + _this.size +
            '&attribute=' + _this.attribute +
            '&direction=' + _this.direction
      }
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
          if (json.objects != null) {
            let data = []
            for (let i = 0; i < _this.data.length; i++) {
              data.push(_this.data[i])
            }
            for (let j = 0; j < json.objects.length; j++) {
              data.push(json.objects[j])
            }
            _this.data = data
            _this.loading = false
            _this.page += 1
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
          return false
        }
      })
    },
    getData: function () {
      let _this = this
      _this.loading = true
      let url = i18N.domain + '/demand/normal/list?page=' + _this.page +
          '&size=' + _this.size +
          '&attribute=' + _this.attribute +
          '&direction=' + _this.direction
      let path = _this.$router.currentRoute.path
      let pathRegExp = new RegExp('.*?((?:[a-z][a-z]+)).*?((?:[a-z][a-z]+))')
      let pathM = pathRegExp.exec(path)
      if (pathM != null) {
        let word1 = pathM[1]
        let word2 = pathM[2]
        path = '/' + word1.replace(/</, '&lt;') + '/' + word2.replace(/</, '&lt;')
      }
      if (path === '/user/demand') {
        let id = '-1'
        let idRegExp = new RegExp('.*?(\\d+)')
        let idM = idRegExp.exec(_this.$router.currentRoute.path)
        if (idM != null) {
          id = idM[1].replace(/</, '&lt;')
        }
        url = i18N.domain + '/demand/user?id=' + id +
            '&page=' + _this.page +
            '&size=' + _this.size +
            '&attribute=' + _this.attribute +
            '&direction=' + _this.direction
      }
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
          _this.data = json.objects
          _this.loading = false
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
          return false
        }
      })
    }
  },
  created () {
    // 初始化数据
    this.getData()
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #000;
  }

  .loading-control {
    margin: 50px 50px;
  }
</style>
