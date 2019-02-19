<template>
  <v-app>
  <v-form
    id="postForm"
    ref="form"
    v-model="valid"
    lazy-validation
    class="form-control"
  >
    <v-text-field
      name="title"
      v-model="title"
      :rules="contentRules"
      :label="i18N.attribute.article.title"
      required
    ></v-text-field>
    <v-text-field
      name="introduction"
      v-model="introduction"
      :rules="introductionRules"
      :label="i18N.attribute.article.introduction"
      required
    ></v-text-field>
    <v-text-field
      name="content"
      v-model="content"
      :rules="contentRules"
      :label="i18N.attribute.article.content"
      required
    ></v-text-field>
  </v-form>
  <mavon-editor v-model="content"/>
    <v-btn
      :disabled="!valid"
      color="success"
      @click="validate"
    >
      {{i18N.post}}
    </v-btn>
  </v-app>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'Post',
  data () {
    return {
      i18N: i18N, // i18N配置文件
      domain: i18N.domain, // 请求地址
      valid: true,
      title: '',
      titleRules: [
        v => !!v || i18N.attribute.article.title + i18N.is + i18N.empty
      ],
      introduction: '',
      introductionRules: [
        v => !!v || i18N.attribute.article.introduction + i18N.is + i18N.empty
      ],
      content: '',
      contentRules: [
        v => !!v || i18N.attribute.article.content + i18N.is + i18N.empty
      ]
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.post()
      }
    },
    post: function () {
      const _this = this
      $.ajax({
        type: 'post',
        url: i18N.domain + '/article/post',
        data: $('#postForm').serialize(),
        dataType: 'json',
        async: false,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          const status = json.status
          if (status === 0) {
            _this.$router.push({path: '/'})
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .form-control {
    margin: 25px 25px;
  }
</style>
