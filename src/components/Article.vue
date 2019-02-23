<template>
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
        <v-avatar color="grey" class="mr-3">
          <img :src="i18N.domain+articleData.author.avatar" alt="avatar">
        </v-avatar>
        <strong class="title">{{articleData.title}}</strong>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-layout>
      <div class="markdown-body">
        <blockquote>
          <p>
            {{articleData.introduction}}
          </p>
        </blockquote>
        <div v-html="markdown"></div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'
import markdownEditor from 'mavon-editor'
import 'github-markdown-css'

export default {
  name: 'Article',
  data () {
    return {
      i18N: i18N, // i18N配置文件
      loading: true, // 是否加载中
      articleData: {
        title: i18N.loading
      }
    }
  },
  computed: {
    markdown () {
      return markdownEditor.markdownIt.render(this.articleData.content)
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
        url: i18N.domain + '/article/id/' + _id,
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            _this.articleData = json.object
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

<style scoped>
  .loading-control {
    margin: 50px 50px;
  }
</style>
