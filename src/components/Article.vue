<template>
  <v-card flat>
    <div class="text-xs-center" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
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
      <p v-html="articleData.introduction"></p>
      <p v-html="articleData.content"></p>
    </v-card-text>
  </v-card>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'Article',
  data: () => ({
    i18N: i18N, // i18N配置文件
    domain: i18N.domain, // 请求地址
    loading: true, // 是否加载中
    articleData: {
      title: i18N.loading
    }
  }),
  methods: {
    getArticle () {
      const _this = this
      const _id = this.$route.params.id
      if (_id === undefined) {
        this.$router.push({path: '/'})
        return false
      }
      _this.loading = true
      $.ajax({
        type: 'get',
        url: i18N.domain + '/article/' + _id,
        data: $('#loginForm').serialize(),
        dataType: 'json',
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          const status = json.status
          if (status === 0) {
            _this.articleData = json.object
            _this.loading = false
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
          return false
        }
      })
    }
  },
  watch: {
    '$route' () {
      this.getArticle()
    }
  },
  created () {
    this.getArticle()
  }
}

</script>

<style scoped></style>
