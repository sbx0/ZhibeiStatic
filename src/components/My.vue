<template>
  <v-app>
    <div class="text-xs-center" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="loading-control"
      ></v-progress-circular>
    </div>
    <v-layout justify-center v-else>
      <v-flex>
        <v-card>
          <v-card-title class="blue darken-1">
            <span class="headline white--text">{{user.name}}</span>
            <v-spacer></v-spacer>
            <v-btn dark icon @click="certification">
              <v-icon>assignment_ind</v-icon>
            </v-btn>
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
              </v-list>
            </v-menu>
          </v-card-title>
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
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
              </keep-alive>
              <router-view v-if="!$route.meta.keepAlive"></router-view>
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
          <v-card
            class="mx-auto"
            color="grey lighten-4"
            max-width="600"
          >
            <v-card-title>
              <v-layout
                wrap
                align-start
              >
                <v-flex xs6>
                  <div class="caption grey--text text-uppercase">
                    {{i18N.attribute.wallet.money}}
                  </div>
                  <span
                    class="display-2 font-weight-black"
                  >
                    {{money}}
                  </span>
                  <strong>￥</strong>
                </v-flex>
                <v-flex xs6>
                  <div class="caption grey--text text-uppercase">
                    {{i18N.attribute.user.integral}}
                  </div>
                  <span
                    class="display-2 font-weight-black"
                  >
                    {{user.integral}}
                  </span>
                </v-flex>
                <v-flex xs6>
                  <div class="caption grey--text text-uppercase">
                    {{i18N.attribute.user.level}}
                  </div>
                  <span
                    class="display-2 font-weight-black"
                  >
                    Lv
                    {{user.level}}
                  </span>
                </v-flex>
                <v-flex xs6>
                  <div class="caption grey--text text-uppercase">
                    {{i18N.attribute.user.exp}}
                  </div>
                  <div class="text-xs-center">
                    <v-progress-circular
                      rotate="360"
                      size="100"
                      width="10"
                      :value="(user.exp / user.exp_max) * 100"
                      color="teal"
                    >
                      {{ user.exp + '/' + user.exp_max }}
                    </v-progress-circular>
                  </div>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
          <v-list class="blue darken-2" dark>
            <template v-for="(item, index) in items">
              <v-list-tile v-if="item.action" :key="item.title" @click="tools.go(item.page)">
                <v-list-tile-action>
                  <v-icon>{{ item.action }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content class="white--text">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-else-if="item.divider" :key="index"></v-divider>
              <v-subheader v-else-if="item.header" :key="item.header" class="grey--text text--lighten-4">
                {{ item.header }}
              </v-subheader>
            </template>
          </v-list>
          <v-dialog v-model="dataDialog">
            <v-card>
              <v-card-title>
                <span class="headline">{{cardTitle}}</span>
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
          <upload-avatar
            @uploadData="getChildData"
            w="1"
            h="1"
            :t="i18N.upload + i18N.attribute.user.avatar"
          ></upload-avatar>
          <v-img
            :src="i18N.domain+user.avatar"
          ></v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'
import UploadAvatar from '@/components/AvatarUpload'

export default {
  name: 'My',
  components: {UploadAvatar},
  data () {
    return {
      i18N: i18N,
      loading: true, // 是否加载中
      uploadDialog: false,
      dataDialog: false,
      cardTitle: i18N.personal + i18N.information,
      md5: '',
      checking: false,
      heartbeats: [],
      exp_progress: 0,
      user: {
        name: i18N.not + i18N.login,
        nickname: i18N.not + i18N.login,
        email: i18N.not + i18N.login,
        avatar: '/img/avatar-min-img.png',
        sex: i18N.not + i18N.login,
        introduction: i18N.not + i18N.login,
        birthday: i18N.not + i18N.login
      },
      money: 0,
      items: [
        {
          action: 'money',
          title: i18N.give_me_power,
          page: '/alipay'
        },
        {
          action: 'money',
          title: i18N.apply_list,
          page: '/project/applyList'
        },
        {
          action: 'money',
          title: i18N.my_project,
          page: '/project/my'
        }
        // {divider: true},
        // {header: i18N.others},
        // {
        //   action: 'label',
        //   title: i18N.upload + i18N.avatar
        // }
      ]
    }
  },
  methods: {
    howManyPowerIHave () {
      let _this = this
      $.ajax({
        type: 'GET',
        url: i18N.domain + '/wallet/my',
        async: false,
        dataType: 'json',
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          _this.money = json.money
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    },
    getChildData (data) {
      this.md5 = data.md5
      let _this = this
      $.ajax({
        type: 'GET',
        url: i18N.domain + '/file/avatar?md5=' + _this.md5,
        async: false,
        dataType: 'json',
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            _this.$router.push({path: '/my'})
          }
          alert(_this.tools.statusCodeToAlert(status))
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    },
    certification () {
      this.cardTitle = i18N.certification
      this.dataDialog = true
      this.$router.push({path: '/my/certification'})
    },
    data () {
      this.cardTitle = i18N.personal + i18N.information
      this.dataDialog = true
      this.$router.push({path: '/my/data'})
    },
    dataSave () {
      this.dataDialog = false
      let _this = this
      if (_this.$router.currentRoute.path === '/my/certification') {
        $.ajax({
          type: 'post',
          url: i18N.domain + '/certification/submit',
          data: $('#certificationForm').serialize(),
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
      } else if (_this.$router.currentRoute.path === '/my/data') {
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
      }
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
      this.$router.push({path: '/upload/avatar'})
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
          location.reload()
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    }
  },
  created () {
    this.howManyPowerIHave()
    this.getInfo()
  }
}
</script>

<style scoped>
  .loading-control {
    margin: 50px 50px;
  }
</style>
