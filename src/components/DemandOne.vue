<template>
  <div>
    <v-card flat>
      <v-img :src="data.cover" aspect-ratio="2.75"></v-img>
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
            <v-avatar size="32px" @click="tools.go('/user/'+data.poster.id+'/article')">
              <img
                v-if="data.poster.avatar !== undefined"
                :src="i18N.domain+data.poster.avatar"
              >
            </v-avatar>
            <span v-if="data.poster.nickname != ''">{{data.poster.nickname}}</span>
            <span v-else>{{data.poster.name}}</span>
          </v-flex>
          <v-flex sm4 text-xs-center>{{i18N.attribute.demand.budget+' '+data.budget}}￥</v-flex>
          <v-flex sm4 text-xs-center>{{tools.timeClick(data.endTime)}}</v-flex>
        </v-layout>
        <v-divider class="mt-3 mb-3"></v-divider>
        <div class="markdown-body">
          <blockquote>
            <p>
              {{data.introduction}}
            </p>
          </blockquote>
          <div v-html="markdown" v-viewer></div>
        </div>
        <v-divider class="mt-3"></v-divider>
        <div class="text-xs-center mt-3">
          <v-btn round color="success" dark @click="apply">{{i18N.i_want}}</v-btn>
        </div>
        <v-divider class="mt-3"></v-divider>
        <more-function :key="data.id + '_more'" :path="'/demand/'+data.id"></more-function>
        <v-divider class="mb-3"></v-divider>
        <div class="text-xs-center">
          <v-chip
            disabled
            v-for="(word,index) in keywords"
            v-bind:key="index"
          >
            {{word}}
          </v-chip>
        </div>
        <v-divider class="mb-3"></v-divider>
        <div class="text-xs-center">
          <v-chip
            small outline label
            v-for="tag in data.tags"
            v-bind:key="tag.id"
            @click="tools.go('/tag/'+tag.id+'/demand')"
          >
            {{tag.name}}
          </v-chip>
        </div>
      </v-card-text>
    </v-card>
    <v-divider class="mt-3 mb-3"></v-divider>
    <CommentList></CommentList>
  </div>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'
import markdownEditor from 'mavon-editor'
import 'github-markdown-css'
import CommentList from '../components/CommentList'
import 'viewerjs/dist/viewer.css'
import MoreFunction from '@/components/MoreFunction'

export default {
  name: 'DemandOne',
  components: {CommentList, MoreFunction},
  data () {
    return {
      i18N: i18N, // i18N配置文件
      loading: true, // 是否加载中
      data: {
        title: i18N.loading,
        content: ''
      },
      keywords: [],
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
        url: i18N.domain + '/demand/normal?id=' + _id,
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
    },
    analysis () {
      let _this = this
      let _id = _this.$route.params.id
      if (_id === undefined) {
        _this.$router.push({path: '/NotFound'})
        return false
      }
      $.ajax({
        type: 'get',
        url: i18N.domain + '/demand/analysis?id=' + _id,
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          _this.keywords = json.keywords
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    },
    apply () {
      let _this = this
      let _id = _this.$route.params.id
      if (_id === undefined) {
        _this.$router.push({path: '/NotFound'})
        return false
      }
      $.ajax({
        type: 'get',
        url: i18N.domain + '/project/apply?id=' + _id,
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            _this.$router.push({path: '/project/my'})
          } else {
            alert(_this.tools.statusCodeToAlert(status))
          }
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
      this.analysis()
    }
  },
  created () {
    this.getData()
    this.analysis()
  }
}
</script>

<style>
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
