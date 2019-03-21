<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="app">
    <v-app id="inspire">
      <div class="text-xs-center" v-if="loading">
        <v-progress-circular
          indeterminate
          color="primary"
          class="loading-control"
        ></v-progress-circular>
      </div>
      <v-layout
        column
        v-else
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
                <v-flex xs2>
                  <v-avatar
                    size="36px"
                  >
                    <img
                      :src="i18N.domain + message.sendUser.avatar"
                    >
                  </v-avatar>
                </v-flex>
                <v-flex no-wrap xs5>
                  <strong v-html="message.sendUser.name"></strong>
                </v-flex>
                <v-flex no-wrap xs5>
                  <v-chip
                    color="red lighten-4"
                    class="ml-0"
                    label
                    small
                  >
                    {{ message.type }}
                  </v-chip>
                </v-flex>
              </v-layout>
            </template>
            <v-card>
              <v-divider></v-divider>
              <v-card-text v-text="message.content"></v-card-text>
              <v-btn
                outline
                color="indigo"
                @click="tools.go('/user/'+message.sendUser.id+'/message')"
                v-if="message.type != 'notice'"
              >
                {{i18N.replay}}
              </v-btn>
              <v-btn
                outline
                color="indigo"
                v-if="message.type != 'notice'"
                @click="haveRead(message.id,'one')"
              >
                {{i18N.have_read}}
              </v-btn>
              <v-btn
                outline
                color="indigo"
                v-if="message.type != 'notice'"
                @click="haveRead(message.sendUser.id,'user')"
              >
                {{i18N.have_read_user}}
              </v-btn>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-btn
          class="mt-5"
          color="green"
          dark
          @click="getData()"
        >
          {{i18N.refresh}}
        </v-btn>
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
      loading: true,
      messages: []
    }
  },
  methods: {
    haveRead (id, type) {
      let _this = this
      _this.loading = true
      $.ajax({
        type: 'get',
        url: i18N.domain + '/message/read?id=' + id + '&type=' + type,
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (!_this.tools.statusCodeToBool(status)) {
            alert(_this.tools.statusCodeToAlert(status))
          }
          _this.loading = false
          _this.getData()
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    },
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
  .loading-control {
    margin: 50px 50px;
  }
</style>
