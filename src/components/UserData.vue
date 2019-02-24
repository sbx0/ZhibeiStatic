<template>
  <v-form
    id="dataForm"
  >
    <v-text-field
      :label="i18N.attribute.user.nickname"
      :value="user.nickname"
      name="nickname"
    ></v-text-field>
    <v-textarea
      :label="i18N.attribute.user.introduction"
      :value="user.introduction"
      name="introduction"
    ></v-textarea>
    <v-menu
      ref="birthdayMenu"
      v-model="birthdayMenu"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <v-text-field
        :label="i18N.attribute.user.birthday"
        name="birthday"
        v-model="user.birthday"
        slot="activator"
        prepend-icon="event"
      ></v-text-field>
      <v-date-picker v-model="user.birthday" no-title @input="birthdayMenu = false"></v-date-picker>
    </v-menu>
    <v-text-field
      :label="i18N.attribute.user.email"
      :value="user.email"
      name="email"
      type="email"
    ></v-text-field>
    <v-text-field
      :label="i18N.attribute.user.phone"
      :value="user.phone"
      name="phone"
      type="phone"
    ></v-text-field>
    <v-radio-group
      v-model="user.sex"
      name="sex"
    >
      <v-radio label="男" value="male"></v-radio>
      <v-radio label="女" value="female"></v-radio>
      <v-radio label="保密" value=""></v-radio>
    </v-radio-group>
  </v-form>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'UserData',
  data () {
    return {
      i18N: i18N,
      user: {
        nickname: '',
        email: '',
        avatar: '/img/avatar-min-img.png',
        sex: '',
        introduction: '',
        birthday: ''
      },
      birthdayMenu: false,
      date: new Date().toISOString().substr(0, 10)
    }
  },
  methods: {
    getInfo () {
      let _this = this
      _this.loading = true
      $.ajax({
        type: 'get',
        url: i18N.domain + '/user/info',
        dataType: 'json',
        async: false,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            if (json.user !== undefined) {
              json.user.birthday = _this.tools.formatDate(json.user.birthday, 'yyyy-MM-dd')
              _this.user = json.user
            }
            _this.loading = false
          } else {
            _this.$router.push({path: '/login'})
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
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

</style>
