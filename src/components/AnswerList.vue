<template>
  <v-list two-line>
    <v-form
      id="answerForm"
      class="form-control"
      v-if="canPost"
    >
      <input name="q_id" v-model="id" style="display: none;">
      <v-textarea
        name="content"
        :value="content"
        v-model="content"
        :label="i18N.attribute.answer.content"
        box
        auto-grow
      >
      </v-textarea>
      <v-btn
        class="primary"
        @click="post"
        block
      >
        {{i18N.answer}}
      </v-btn>
      <v-btn
        class="success"
        @click="tools.go('/post/answer/'+id)"
        block
      >
        {{i18N.markdown_edit}}
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
      <v-divider class="mt-3" :key="index + 'divider_t'"></v-divider>
      <v-layout align-center class="mb-3 mt-3" :key="item.id">
        <v-flex sm4 text-xs-center>
          <v-avatar size="32px" @click="tools.go('/user/'+item.answerer.id+'/answer')">
            <img
              v-if="item.answerer.avatar !== undefined"
              :src="i18N.domain+item.answerer.avatar"
            >
          </v-avatar>
          <span v-if="item.answerer.nickname != ''">{{item.answerer.nickname}}</span>
          <span v-else>{{item.answerer.name}}</span>
        </v-flex>
        <v-flex sm4 text-xs-center>{{tools.timeShow(item.time)}}</v-flex>
        <v-flex sm4 text-xs-center v-if="item.top > 0">
          <v-chip color="orange" text-color="white">
            {{i18N.the_best_of_the_game}}
            <v-icon right>star</v-icon>
          </v-chip>
        </v-flex>
        <v-flex sm4 text-xs-center v-if="item.is_quizzer && item.top === 0 && item.question.status === 0">
          <v-btn
            @click="chose_as_the_best(item.id)"
            color="pink"
            class="white--text"
          >
            {{i18N.chose_as+i18N.the_best_of_the_game}}
            <v-icon right dark>favorite</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-divider :key="item.id + 'divider_c'"></v-divider>
      <div class="markdown-body" :key="item.id + 'content'">
        <div v-html="item.content" v-viewer v-highlight></div>
      </div>
      <more-function :key="item.id + '_more'" :path="'/answer/'+item.id"></more-function>
      <v-divider :key="item.id + 'divider_bb'"></v-divider>
    </template>
    <v-btn block @click="readMore()" v-if="more">{{i18N.read_more}}</v-btn>
  </v-list>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'
import markdownEditor from 'mavon-editor'
import 'viewerjs/dist/viewer.css'
import 'github-markdown-css'
import 'highlight.js'
import 'highlight.js/styles/googlecode.css'
import MoreFunction from '@/components/MoreFunction'

export default {
  name: 'AnswerList',
  components: {MoreFunction},
  data () {
    return {
      i18N: i18N,
      data: [],
      loading: false,
      canPost: true,
      id: this.$route.params.id,
      page: 1, // 当前页数
      size: 10, // 每页条数
      totalPage: 0, // 总页数
      totalElements: 0, // 总条数
      attribute: 'top', // 按什么排序
      direction: 'DESC', // 倒序
      content: '',
      more: false
    }
  },
  methods: {
    chose_as_the_best (id) {
      let _this = this
      $.ajax({
        type: 'get',
        url: i18N.domain + '/answer/best?id=' + id,
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            _this.getData()
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    },
    readMore: function () {
      let _this = this
      let url = i18N.domain +
          '/answer/load?path=' + _this.$router.currentRoute.path +
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
      if (path === '/user/answer') {
        _this.canPost = false
        let id = '-1'
        let idRegExp = new RegExp('.*?(\\d+)')
        let idM = idRegExp.exec(_this.$router.currentRoute.path)
        if (idM != null) {
          id = idM[1].replace(/</, '&lt;')
        }
        url = i18N.domain +
            '/answer/load/user?id=' + id +
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
              _this.data[i].content = markdownEditor.markdownIt.render(_this.data[i].content.toString())
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
          '/answer/load?id=' + _this.$route.params.id + '&page=' + _this.page +
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
      if (path === '/user/answer') {
        _this.canPost = false
        let id = '-1'
        let idRegExp = new RegExp('.*?(\\d+)')
        let idM = idRegExp.exec(_this.$router.currentRoute.path)
        if (idM != null) {
          id = idM[1].replace(/</, '&lt;')
        }
        url = i18N.domain + '/answer/load/user?id=' + id +
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
          _this.loading = false
          if (json.objects != null && json.objects.length === _this.size) {
            _this.more = true
          }
          let data = []
          if (json.objects != null) {
            for (let i = 0; i < json.objects.length; i++) {
              json.objects[i].content = markdownEditor.markdownIt.render(json.objects[i].content.toString())
              data.push(json.objects[i])
            }
          }
          _this.data = data
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
          return false
        }
      })
    },
    post: function () {
      let _this = this
      $.ajax({
        type: 'post',
        url: i18N.domain + '/answer/post',
        data: $('#answerForm').serialize(),
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
            _this.content = ''
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
    margin: 10px 25px 0px 25px;
  }

  .v-input__slot {
    margin-bottom: 0px !important;
  }

  .markdown-body {
    margin-top: 5px;
    margin-left: 20px;
    margin-right: 20px;
  }

  code {
    box-shadow: 0 0px 0px 0px rgba(0, 0, 0, .2) !important;
  }
</style>
