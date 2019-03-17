<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
    <v-card flat>
      <v-card-text>
        <v-container fluid class="pa-0">
          <v-layout align-center>
            <v-flex sm3 text-xs-center>
              <v-btn flat icon>
                <v-icon>favorite</v-icon>
              </v-btn>
            </v-flex>
            <v-flex sm3 text-xs-center>
              <v-btn flat icon>
                <v-icon>star</v-icon>
              </v-btn>
            </v-flex>
            <v-flex sm3 text-xs-center>
              <v-btn flat icon color="green" @click="dialog = true">
                <v-icon>monetization_on</v-icon>
              </v-btn>
            </v-flex>
            <v-flex sm3 text-xs-center>
              <v-btn flat icon>
                <v-icon>thumb_up</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{i18N.support}}
        </v-card-title>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex
              xs4
              v-for="(s,key) in supportList"
              v-bind:key="key"
              @click="support(s.value)"
            >
              <v-card dark color="primary" class="mt-3 mb-3 ml-3 mr-3">
                <v-card-text class="px-0">{{s.value}}￥</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
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
      let _id = this.data.author.id
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
