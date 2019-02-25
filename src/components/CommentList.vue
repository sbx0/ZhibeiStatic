<template>
  <v-list two-line>
    <v-form
      id="commentForm"
      class="form-control"
      v-if="canPost"
    >
      <input name="path" v-model="path" style="display: none;">
      <v-textarea
        :value="content"
        v-model="content"
        name="content"
        :label="i18N.attribute.comment.content"
      >
      </v-textarea>
      <v-btn
        @click="post"
        block
      >
        {{i18N.post}}
      </v-btn>
    </v-form>
    <div class="text-xs-center" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="loading-control"
      ></v-progress-circular>
    </div>
    <template v-for="(item,index) in data" v-else>
      <v-list-tile
        :key="item.id"
        avatar
      >
        <router-link :to="'/user/'+item.poster.id+'/article'">
          <v-list-tile-avatar>
            <img :src="i18N.domain+item.poster.avatar">
          </v-list-tile-avatar>
        </router-link>
        <v-list-tile-content>
          <v-list-tile-title v-html="item.content"></v-list-tile-title>
          <v-list-tile-sub-title v-if="!canPost">
            <router-link :to="item.path">{{item.path}}</router-link>
          </v-list-tile-sub-title>
          <v-list-tile-sub-title v-else>
            {{item.time}}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <hr v-bind:key="index+'hr'" class="v-divider v-divider--inset theme--light">
    </template>
    <v-btn block @click="readMore()">{{i18N.read_more}}</v-btn>
  </v-list>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'CommentList',
  data () {
    return {
      i18N: i18N,
      data: [],
      loading: false,
      canPost: true,
      path: this.$router.currentRoute.path,
      page: 1, // 当前页数
      size: 10, // 每页条数
      totalPage: 0, // 总页数
      totalElements: 0, // 总条数
      attribute: 'time', // 按什么排序
      direction: 'DESC', // 倒序
      content: ''
    }
  },
  methods: {
    readMore: function () {
      let _this = this
      let url = i18N.domain +
          '/comment/load?path=' + _this.$router.currentRoute.path +
          '&page=' + (_this.page + 1) +
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
      if (path === '/user/comment') {
        _this.canPost = false
        let id = '-1'
        let idRegExp = new RegExp('.*?(\\d+)')
        let idM = idRegExp.exec(_this.$router.currentRoute.path)
        if (idM != null) {
          id = idM[1].replace(/</, '&lt;')
        }
        url = i18N.domain +
            '/comment/load/user/?id=' + id +
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
      }
      )
    },
    getData: function () {
      let _this = this
      _this.loading = true
      let url = i18N.domain +
          '/comment/load?path=' + _this.$router.currentRoute.path + '&page=' + _this.page +
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
      if (path === '/user/comment') {
        _this.canPost = false
        let id = '-1'
        let idRegExp = new RegExp('.*?(\\d+)')
        let idM = idRegExp.exec(_this.$router.currentRoute.path)
        if (idM != null) {
          id = idM[1].replace(/</, '&lt;')
        }
        url = i18N.domain + '/comment/load/user/?id=' + id +
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
    },
    post: function () {
      let _this = this
      _this.content = ''
      $.ajax({
        type: 'post',
        url: i18N.domain + '/comment/post',
        data: $('#commentForm').serialize(),
        dataType: 'json',
        async: false,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            _this.page = 1
            _this.getData()
          } else {
            alert(_this.tools.statusCodeToAlert(status))
          }
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
  .form-control {
    margin: 25px 25px;
  }
</style>
