<template>
  <v-list two-line>
    <template v-for="(item, index) in data">
      <v-list-tile
        :key="item.id+'q'"
        class="pb-1"
        avatar
        ripple
      >
        <v-list-tile-content>
          <v-list-tile-title @click="tools.go('/question/'+item.id)" class="question-title">
            {{ item.title }}
          </v-list-tile-title>
          <v-list-tile-sub-title class="text--primary" @click="tools.go('/question/'+item.id)">
            {{tools.timeShow(item.time)}}
          </v-list-tile-sub-title>
          <v-list-tile-sub-title
            @click="tools.go('/user/'+item.quizzer.id+'/question')"
          >
            <v-avatar
              size="20"
            >
              <img v-if="item.quizzer.avatar !== undefined" :src="i18N.domain+item.quizzer.avatar">
            </v-avatar>
            <span v-if="item.quizzer.nickname != ''">{{item.quizzer.nickname}}</span>
            <span v-else>{{item.quizzer.name}}</span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text v-if="item.price != '0'">{{ item.price }} ￥</v-list-tile-action-text>
          <v-list-tile-action-text v-if="item.tags.length > 0">
            <v-chip small outline label>{{item.tags[0].name}}</v-chip>
          </v-list-tile-action-text>
          <!--<v-icon-->
          <!--color="grey lighten-1"-->
          <!--&gt;-->
          <!--star_border-->
          <!--</v-icon>-->
        </v-list-tile-action>
      </v-list-tile>
      <v-divider
        v-if="index < data.length"
        :key="index"
      ></v-divider>
    </template>
    <v-btn block @click="readMore()" v-if="more">{{i18N.read_more}}</v-btn>
  </v-list>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'QuestionList',
  data () {
    return {
      i18N: i18N,
      loading: true, // 是否加载中
      page: 1, // 当前页数
      size: 10, // 每页条数
      totalPage: 0, // 总页数
      totalElements: 0, // 总条数
      attribute: 'time', // 按什么排序
      direction: 'DESC', // 倒序
      data: [], // 数据
      show: false,
      more: false
    }
  },
  methods: {
    readMore: function () {
      let _this = this
      let url = i18N.domain +
          '/question/normal/list?page=' + (_this.page + 1) +
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
      if (path === '/user/question') {
        let id = '-1'
        let idRegExp = new RegExp('.*?(\\d+)')
        let idM = idRegExp.exec(_this.$router.currentRoute.path)
        if (idM != null) {
          id = idM[1].replace(/</, '&lt;')
        }
        url = i18N.domain +
            '/question/user?id=' + id +
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
          if (json.objects != null && json.objects.length < _this.size) {
            _this.more = false
          }
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
    getData () {
      let _this = this
      _this.loading = true
      let url = i18N.domain + '/question/normal/list?page=' + _this.page +
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
      if (path === '/user/question') {
        let id = '-1'
        let idRegExp = new RegExp('.*?(\\d+)')
        let idM = idRegExp.exec(_this.$router.currentRoute.path)
        if (idM != null) {
          id = idM[1].replace(/</, '&lt;')
        }
        url = i18N.domain + '/question/user?id=' + id +
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
          if (json.objects != null && json.objects.length === _this.size) {
            _this.more = true
          }
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
    this.getData()
  }
}
</script>

<style scoped>
  .question-title {
    font-size: 18px;
  }
</style>
