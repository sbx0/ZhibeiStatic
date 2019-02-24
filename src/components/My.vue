<template>
  <div>
    <div class="text-xs-center" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="loading-control"
      ></v-progress-circular>
    </div>
    <v-layout justify-center v-else>
      <v-flex xs12 sm8>
        <v-card>
          <v-card-title class="cyan darken-1">
            <span class="headline white--text">{{user.name}}</span>
            <v-spacer></v-spacer>
            <v-btn dark icon @click="data">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-menu bottom left>
              <v-btn
                slot="activator"
                dark
                icon
              >
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title @click="logout">
                    {{ i18N.logout }}
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title @click="upload">
                    {{ i18N.avatar }}
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-list>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>(650) 555-1234</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>chat</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>(323) 555-6789</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>chat</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>mcbeal@example.com</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>location_on</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Orlando, FL 79938</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-dialog
            v-model="uploadDialog"
            width="500"
          >
            <v-card>
              <v-card-title
                class="headline grey lighten-2"
                primary-title
              >
                {{i18N.upload + i18N.attribute.user.avatar}}
              </v-card-title>
              <router-view></router-view>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  flat
                  @click="back"
                >
                  {{i18N.close}}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dataDialog" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">{{i18N.personal + i18N.information}}</span>
              </v-card-title>
              <v-card-text>
                <router-view></router-view>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dataBack">{{i18N.close}}</v-btn>
                <v-btn color="blue darken-1" flat @click="dataSave">{{i18N.save}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-img
            :src="i18N.domain+user.avatar"
          ></v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'My',
  data () {
    return {
      i18N: i18N,
      loading: true, // 是否加载中
      uploadDialog: false,
      dataDialog: false,
      user: {
        name: i18N.not + i18N.login,
        nickname: i18N.not + i18N.login,
        email: i18N.not + i18N.login,
        avatar: '/img/avatar-min-img.png',
        sex: i18N.not + i18N.login,
        introduction: i18N.not + i18N.login,
        birthday: i18N.not + i18N.login
      }
    }
  },
  methods: {
    data () {
      this.dataDialog = true
      this.$router.push({path: '/my/data'})
    },
    dataSave () {
      this.dataDialog = false
      let _this = this
      $.ajax({
        type: 'post',
        url: i18N.domain + '/user/data',
        data: $('#dataForm').serialize(),
        dataType: 'json',
        async: false,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            _this.$router.push({path: '/my'})
          } else {
            alert(_this.tools.statusCodeToAlert(status))
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
          return false
        }
      })
    },
    dataBack () {
      this.dataDialog = false
      this.$router.push({path: '/my'})
    },
    back () {
      this.uploadDialog = false
      this.$router.push({path: '/my'})
    },
    upload () {
      this.uploadDialog = true
      this.$router.push({path: '/my/upload'})
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
            _this.loading = false
          } else {
            _this.$router.push({path: '/login'})
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    },
    logout () {
      let _this = this
      $.ajax({
        type: 'get',
        url: i18N.domain + '/user/logout',
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function () {
          _this.getInfo()
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
  .loading-control {
    margin: 50px 50px;
  }
</style>
