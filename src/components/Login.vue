<template>
  <transition>
    <v-form
      id="loginForm"
      ref="form"
      v-model="valid"
      lazy-validation
      class="form-control"
      v-if="loginOrRegister"
    >
      <v-alert
        :value="true"
        type="info"
        @click="loginOrRegister = false"
      >
        {{i18N.login_title}}
      </v-alert>
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
        color="success"
        @click="validateLogin"
      >
        {{i18N.login}}
      </v-btn>
      <v-btn
        color="error"
        @click="reset"
      >
        {{i18N.reset}}
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
      <v-alert
        :value="true"
        type="info"
        @click="loginOrRegister = true"
      >
        {{i18N.register_title}}
      </v-alert>
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
        color="success"
        @click="validateRegister"
      >
        {{i18N.register}}
      </v-btn>
      <v-btn
        color="error"
        @click="reset"
      >
        {{i18N.reset}}
      </v-btn>
    </v-form>
  </transition>
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
      const _this = this
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
          const status = json.status
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
      const _this = this
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
            const status = json.status
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
    validateRegister () {
      const _this = this
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
            const status = json.status
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
