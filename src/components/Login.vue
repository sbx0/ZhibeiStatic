<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app>
    <v-jumbotron
      height="200"
      src="https://github.githubassets.com/images/modules/site/heroes/simple-codelines.svg"
      light
    >
      <v-container fill-height>
        <v-layout align-center>
          <v-img
            src="http://zb.sbx0.cn/upload/image/20190311131606581.png"
            lazy-src="http://zb.sbx0.cn/upload/image/20190311131606581.png"
            aspect-ratio="1"
            class="lighten-2"
          >
            <template v-slot:placeholder>
              <v-layout
                fill-height
                align-center
                justify-center
                ma-0
              >
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-layout>
            </template>
          </v-img>
          <v-flex text-xs-center>
            <h3 class="display-3">{{i18N.website_name}}</h3>
            <h4>{{i18N.website_slogan}}</h4>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <v-form
      id="loginForm"
      ref="form"
      v-model="valid"
      lazy-validation
      class="form-control"
      v-if="loginOrRegister"
    >
      <v-text-field
        name="name"
        v-model="name"
        :rules="nameRules"
        :label="i18N.attribute.user.name"
        required
      ></v-text-field>
      <v-text-field
        name="password"
        v-model="password"
        :rules="passwordRules"
        :label="i18N.attribute.user.password"
        type="password"
        required
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        round
        color="success"
        dark
        @click="validateLogin"
        block
        class="mb-5"
      >
        {{i18N.login}}
      </v-btn>
      <v-btn
        color="primary"
        @click="loginOrRegister = false"
        round
      >
        {{i18N.register}}
      </v-btn>
      <v-btn
        color="error"
        round
        @click="tools.go('/lostPassword')"
      >
        {{i18N.lost_password}}
      </v-btn>
    </v-form>
    <v-form
      id="registerForm"
      ref="form"
      v-model="valid"
      lazy-validation
      class="form-control"
      v-else
    >
      <v-text-field
        name="name"
        v-model="name"
        :rules="nameRules"
        :label="i18N.attribute.user.name"
        required
      ></v-text-field>
      <v-text-field
        name="password"
        v-model="password"
        :rules="passwordRules"
        :label="i18N.attribute.user.password"
        type="password"
        required
      ></v-text-field>
      <v-text-field
        v-model="rPassword"
        :rules="rPasswordRules"
        :label="i18N.confirm + i18N.attribute.user.password"
        type="password"
        required
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        round
        color="success"
        dark
        @click="validateRegister"
        block
        class="mb-5"
      >
        {{i18N.register}}
      </v-btn>
      <v-btn
        color="primary"
        round
        @click="loginOrRegister = true"
      >
        {{i18N.login}}
      </v-btn>
      <v-btn
        color="error"
        round
        @click="tools.go('/lostPassword')"
      >
        {{i18N.lost_password}}
      </v-btn>
    </v-form>
  </v-app>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'Login',
  data () {
    return {
      i18N: i18N, // i18N配置文件
      valid: true,
      loginOrRegister: true,
      name: '',
      nameRules: [
        v => !!v || i18N.attribute.user.name + i18N.is + i18N.empty
      ],
      password: '',
      passwordRules: [
        v => !!v || i18N.attribute.user.password + i18N.is + i18N.empty
      ],
      rPassword: '',
      rPasswordRules: [
        v => !!v || i18N.attribute.user.password + i18N.is + i18N.empty
      ]
    }
  },
  methods: {
    getInfo () {
      let _this = this
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
            _this.$router.push({path: '/my'})
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    },
    validateLogin () {
      let _this = this
      if (this.$refs.form.validate()) {
        $.ajax({
          type: 'post',
          url: i18N.domain + '/user/login',
          data: $('#loginForm').serialize(),
          dataType: 'json',
          async: false,
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },
          success: function (json) {
            let status = json.status
            if (_this.tools.statusCodeToBool(status)) {
              location.reload()
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
    validateRegister () {
      let _this = this
      if (_this.$refs.form.validate()) {
        $.ajax({
          type: 'post',
          url: i18N.domain + '/user/register',
          data: $('#registerForm').serialize(),
          dataType: 'json',
          async: false,
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },
          success: function (json) {
            let status = json.status
            if (_this.tools.statusCodeToBool(status)) {
              _this.loginOrRegister = true
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
    reset () {
      this.$refs.form.reset()
    }
  },
  created () {
    this.getInfo()
  }
}

</script>

<style scoped>
  .form-control {
    margin: 25px 25px;
  }
</style>
