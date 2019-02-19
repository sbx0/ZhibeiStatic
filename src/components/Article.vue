<template>
  <v-card flat>
    <v-card-text>
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
      $.ajax({
        type: 'get',
        url: i18N.domain + '/article/' + _id,
        data: $('#loginForm').serialize(),
        dataType: 'json',
        async: false,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          const status = json.status
          if (status === 0) {
            _this.articleData = json.object
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
    this.getArticle()
  }
}

</script>

<style scoped></style>
