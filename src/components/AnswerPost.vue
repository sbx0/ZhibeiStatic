<template>
  <div>
    <div class="text-xs-center" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="loading-control"
      ></v-progress-circular>
    </div>
    <v-app v-else>
      <v-jumbotron
        color="#9e9e9e47"
        height="60px"
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
              <v-icon>book</v-icon>
              <h3>{{i18N.markdown_edit}}</h3>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
      <v-form
        id="postForm"
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <input name="q_id" v-model="id" style="display: none;">
        <textarea name="content" :value="content" hidden></textarea>
      </v-form>
      <mavon-editor v-model="content" ref=md @imgAdd="imgAdd"/>
      <v-btn
        :disabled="!valid"
        color="success"
        @click="validate"
      >
        {{i18N.markdown_edit}}
      </v-btn>
    </v-app>
  </div>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import axios from 'axios'
import $ from 'jquery'

export default {
  name: 'AnswerPost',
  data () {
    return {
      i18N: i18N, // i18N配置文件
      valid: true,
      loading: true,
      id: this.$route.params.id,
      content: ''
    }
  },
  methods: {
    // 绑定@imgAdd event
    imgAdd (pos, $file) {
      let _this = this
      // 第一步.将图片上传到服务器.
      let imgData = new FormData()
      imgData.append('file', $file)
      axios.defaults.withCredentials = true
      axios({
        url: i18N.domain + '/file/upload',
        method: 'post',
        data: imgData,
        headers: {'Content-Type': 'multipart/form-data'},
        crossDomain: true
      }).then(function (response) {
        let status = response.data.status
        if (_this.tools.statusCodeToBool(status) || status === 7) {
          let url = i18N.domain + '/upload/' + response.data.type + '/' + response.data.name
          _this.$refs.md.$img2Url(pos, url)
        }
      })
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.post()
      }
    },
    getInfo () {
      let _this = this
      _this.loading = true
      $.ajax({
        type: 'get',
        url: i18N.domain + '/user/info',
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            if (json.user !== undefined) {
              _this.user = json.user
            }
          } else {
            _this.$router.push({path: '/login'})
          }
          _this.loading = false
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    },
    post: function () {
      let _this = this
      $.ajax({
        type: 'post',
        url: i18N.domain + '/answer/post',
        data: $('#postForm').serialize(),
        dataType: 'json',
        async: false,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            _this.$router.push({path: '/question/' + _this.id})
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
    this.getInfo()
  }
}
</script>

<style scoped>

  a {
    text-decoration: none;
  }

  .form-control {
    margin: 25px 25px;
  }

  .loading-control {
    margin: 50px 50px;
  }

  .v-note-wrapper {
    z-index: 0;
  }
</style>
