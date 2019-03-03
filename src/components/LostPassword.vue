<template>
  <v-form
    id="lostPassword"
    ref="form"
    v-model="valid"
    lazy-validation
    class="form-control"
  >
    <v-text-field
      name="email"
      v-model="email"
      :value="email"
      :rules="emailRules"
      :label="i18N.attribute.user.email"
      type="email"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      @click="validate"
    >
      {{i18N.submit}}
    </v-btn>
  </v-form>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'LostPassword',
  data () {
    return {
      i18N: i18N, // i18N配置文件
      valid: true,
      email: '',
      emailRules: [
        v => !!v || i18N.attribute.user.email + i18N.is + i18N.empty
      ]
    }
  },
  methods: {
    validate () {
      let _this = this
      if (this.$refs.form.validate()) {
        $.ajax({
          type: 'get',
          url: i18N.domain + '/user/lostPassword?email=' + _this.email,
          dataType: 'json',
          async: false,
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },
          success: function (json) {
            let status = json.status
            if (_this.tools.statusCodeToBool(status)) {
              alert(i18N.lost_password_title)
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
    }
  }
}
</script>

<style scoped>
  .form-control {
    margin: 25px 25px;
  }
</style>
