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
        <v-layout align-center mb-3>
          <v-list-tile
            avatar
          >
            <v-list-tile-avatar
              @click="tools.go('/user/'+data.author.id+'/article')"
            >
              <img v-if="data.author.avatar !== undefined" :src="i18N.domain+data.author.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content @click="tools.go('/article/'+data.id)">
              <v-list-tile-title v-html="data.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="data.introduction"></v-list-tile-sub-title>
              <v-list-tile-sub-title>
                {{tools.timeShow(data.time)}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-layout>
        <div class="markdown-body">
          <div v-html="markdown" v-viewer v-highlight></div>
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
        </div>
      </v-card-text>
    </v-card>
    <CommentList></CommentList>
  </div>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'
import markdownEditor from 'mavon-editor'
import CommentList from '../components/CommentList'
import 'viewerjs/dist/viewer.css'
import 'github-markdown-css'
import 'highlight.js'
import 'highlight.js/styles/googlecode.css'

export default {
  name: 'Article',
  components: {CommentList},
  data () {
    return {
      i18N: i18N, // i18N配置文件
      loading: true, // 是否加载中
      data: {
        title: i18N.loading,
        content: ''
      },
      markdown: ''
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
        url: i18N.domain + '/article/normal?id=' + _id,
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
            let content = _this.data.content
            _this.markdown = markdownEditor.markdownIt.render(content.toString())
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
