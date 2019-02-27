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
          <router-link :to="'/user/'+data.poster.id+'/article'">
            <v-list-tile-avatar>
              <img v-if="data.poster.avatar !== undefined" :src="i18N.domain+data.poster.avatar">
            </v-list-tile-avatar>
          </router-link>
          <v-list-tile-content>
            <router-link :to="'/demand/'+data.id">
              <v-list-tile-title v-html="data.title"></v-list-tile-title>
            </router-link>
            <v-list-tile-sub-title>{{i18N.attribute.demand.budget+' '+data.budget}}￥</v-list-tile-sub-title>
            <v-list-tile-sub-title>
              {{tools.timeClick(data.time,data.endTime)}}
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </v-layout>
        <div class="markdown-body">
          <blockquote>
            <p>
              {{data.introduction}}
            </p>
          </blockquote>
          <div v-html="markdown" v-viewer></div>
          <div class="text-xs-center">
            <v-chip
              label
              small
            >
              {{data.category.name}}
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
import 'github-markdown-css'
import CommentList from '../components/CommentList'
import 'viewerjs/dist/viewer.css'

export default {
  name: 'DemandOne',
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
