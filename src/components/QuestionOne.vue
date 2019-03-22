<template>
  <div>
    <v-card flat>
      <div class="text-xs-center" v-if="loading">
        <v-progress-circular
          indeterminate
          color="primary"
          class="loading-control"
        ></v-progress-circular>
      </div>
      <v-card-text v-else>
        <h2>{{data.title}}</h2>
        <v-divider class="mt-3 mb-3"></v-divider>
        <v-layout align-center mb-3>
          <v-flex sm4 text-xs-center>
            <v-avatar size="32px" @click="tools.go('/user/'+data.quizzer.id+'/question')">
              <img
                v-if="data.quizzer.avatar !== undefined"
                :src="i18N.domain+data.quizzer.avatar"
              >
            </v-avatar>
            <span v-if="data.quizzer.nickname != ''">{{data.quizzer.nickname}}</span>
            <span v-else>{{data.quizzer.name}}</span>
          </v-flex>
          <v-flex sm4 text-xs-center>{{tools.timeShow(data.time)}}</v-flex>
          <v-flex sm4 text-xs-center v-if="data.price != '0'">{{data.price}}￥</v-flex>
        </v-layout>
        <v-divider class="mt-3 mb-3"></v-divider>
        <div class="markdown-body">
          <div v-html="markdown" v-viewer v-highlight></div>
        </div>
        <v-divider class="mt-3 mb-3"></v-divider>
        <div class="text-xs-center">
          <v-chip
            label
            small
            v-for="tag in data.tags"
            v-bind:key="tag.id"
          >
            {{tag.name}}
          </v-chip>
        </div>
      </v-card-text>
    </v-card>
    <v-divider class="mt-3 mb-3"></v-divider>
    <AnswerList></AnswerList>
  </div>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'
import markdownEditor from 'mavon-editor'
import AnswerList from '../components/AnswerList'
import 'viewerjs/dist/viewer.css'
import 'github-markdown-css'
import 'highlight.js'
import 'highlight.js/styles/googlecode.css'

export default {
  name: 'QuestionOne',
  components: {AnswerList},
  data () {
    return {
      i18N: i18N, // i18N配置文件
      loading: true, // 是否加载中
      dialog: false, // 是否加载中
      data: {
        title: i18N.loading,
        content: ''
      },
      supportList: [
        {value: 1},
        {value: 10},
        {value: 100},
        {value: 1000},
        {value: 10000}
      ],
      markdown: ''
    }
  },
  methods: {
    support (value) {
      let _this = this
      let _id = this.data.quizzer.id
      $.ajax({
        type: 'get',
        url: i18N.domain + '/wallet/support?id=' + _id + '&money=' + value,
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          alert(_this.tools.statusCodeToAlert(status))
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    },
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
        url: i18N.domain + '/question/normal?id=' + _id,
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
            let description = _this.data.description
            _this.markdown = markdownEditor.markdownIt.render(description.toString())
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

<style>
  code {
    box-shadow: 0 0px 0px 0px rgba(0, 0, 0, .2) !important;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  .loading-control {
    margin: 50px 50px;
  }

  .markdown-body img {
    max-width: 100%;
    max-height: 250px;
  }
</style>
