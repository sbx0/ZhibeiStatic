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
              <v-icon>question_answer</v-icon>
              <h3>{{i18N.post+i18N.table.question}}</h3>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
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
          :rules="titleRules"
          :label="i18N.attribute.question.title"
          required
        ></v-text-field>
        <textarea name="description" :value="description" hidden></textarea>
        <select name="tags" multiple style="display: none;">
          <option v-for="(tag,key) in tagsSelected" v-bind:key="key" :value="tag" selected>
            {{tag}}
          </option>
        </select>
        <v-select
          :label="i18N.attribute.question.tags"
          :items="tags"
          v-model="tagsSelected"
          item-text="name"
          item-value="id"
          attach
          chips
          multiple
        ></v-select>
        <select name="appoint" style="display: none;">
          <option v-for="(tag,key) in userSelected" v-bind:key="key" :value="tag" selected>
            {{tag}}
          </option>
        </select>
        <v-select
          :label="i18N.attribute.question.appoint"
          :items="users"
          v-model="userSelected"
          item-text="name"
          item-value="id"
          attach
          chips
        ></v-select>
        <v-text-field
          name="price"
          type="number"
          prefix="￥"
          v-model="price"
          :rules="priceRules"
          :label="i18N.attribute.question.price"
          required
        ></v-text-field>
      </v-form>
      <mavon-editor v-model="description" ref=md @imgAdd="imgAdd"/>
      <v-btn
        :disabled="!valid"
        color="success"
        @click="validate"
      >
        {{i18N.post}}
      </v-btn>
    </v-app>
  </div>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import axios from 'axios'
import $ from 'jquery'

export default {
  name: 'QuestionPost',
  data () {
    return {
      i18N: i18N, // i18N配置文件
      valid: true,
      loading: true,
      title: '',
      description: '',
      tags: [],
      users: [],
      tagsSelected: [],
      userSelected: [],
      titleRules: [
        v => !!v || i18N.attribute.question.title + i18N.is + i18N.empty
      ],
      introduction: '',
      introductionRules: [
        v => !!v || i18N.attribute.question.introduction + i18N.is + i18N.empty
      ],
      priceRules: [
        v => !!v || i18N.attribute.question.price + i18N.is + i18N.empty
      ],
      price: '0.00',
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
    getUsers () {
      let _this = this
      $.ajax({
        type: 'get',
        url: i18N.domain + '/user/normal/list?page=1' +
          '&size=9999',
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            if (json.objects !== undefined) {
              _this.users = json.objects
            }
          } else {
            alert(_this.tools.statusCodeToAlert(status))
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    },
    getTags () {
      let _this = this
      $.ajax({
        type: 'get',
        url: i18N.domain + '/tag/normal/list?page=1' +
            '&size=9999',
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            if (json.objects !== undefined) {
              _this.tags = json.objects
            }
          } else {
            alert(_this.tools.statusCodeToAlert(status))
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
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
        url: i18N.domain + '/question/post',
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
            _this.$router.push({path: '/'})
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
    this.getTags()
    this.getUsers()
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
