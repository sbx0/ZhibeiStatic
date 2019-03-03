<template>
  <v-form
    id="changePassword"
    ref="form"
    v-model="valid"
    lazy-validation
    class="form-control"
  >
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
  name: 'ChangePassword',
  data () {
    return {
      i18N: i18N, // i18N配置文件
      valid: true,
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
    validate () {
      let _this = this
      if (_this.$refs.form.validate()) {
        let md5 = this.$route.params.md5
        $.ajax({
          type: 'get',
          url: i18N.domain + '/user/changePassword?password=' + _this.password + '&md5=' + md5,
          dataType: 'json',
          async: false,
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },
          success: function (json) {
            let status = json.status
            alert(_this.tools.statusCodeToAlert(status))
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
