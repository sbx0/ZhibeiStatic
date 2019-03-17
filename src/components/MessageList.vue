<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="app">
    <v-app id="inspire">
      <v-layout
        column
      >
        <v-subheader>{{i18N.message}}</v-subheader>
        <v-expansion-panel popout>
          <v-expansion-panel-content
            v-for="(message, i) in messages"
            :key="i"
            hide-actions
          >
            <template v-slot:header>
              <v-layout
                align-center
                row
                spacer
              >
                <v-flex xs4 sm2 md1>
                  <v-avatar
                    size="36px"
                  >
                    <img
                      :src="i18N.domain + message.sendUser.avatar"
                    >
                  </v-avatar>
                </v-flex>
                <v-flex no-wrap xs5 sm3>
                  <strong v-html="message.sendUser.name"></strong>
                </v-flex>
              </v-layout>
            </template>
            <v-card>
              <v-divider></v-divider>
              <v-card-text v-text="message.content"></v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-layout>
    </v-app>
  </div>
</template>
<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'MessageList',
  data () {
    return {
      i18N: i18N,
      messages: []
    }
  },
  methods: {
    getData () {
      let _this = this
      _this.loading = true
      $.ajax({
        type: 'get',
        url: i18N.domain + '/message/msg',
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            _this.messages = json.objects
          } else {
            alert(_this.tools.statusCodeToAlert(status))
          }
          _this.loading = false
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
</style>
