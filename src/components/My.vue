<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          :src="i18N.domain+user.avatar"
          height="300px"
        >
          <v-layout
            column
            fill-height
          >
            <v-card-title>
              <v-btn dark icon>
                <v-icon>chevron_left</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn dark icon class="mr-3">
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
                  <v-list-tile
                    v-for="(item, i) in items"
                    :key="i"
                  >
                    <v-list-tile-title @click="logout">{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">{{user.name}}</div>
            </v-card-title>
          </v-layout>
        </v-img>

        <v-list two-line>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{user.email}}</v-list-tile-title>
              <v-list-tile-sub-title>{{i18N.attribute.user.email}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'My',
  data: () => ({
    i18N: i18N,
    user: {
      name: i18N.not + i18N.login,
      email: i18N.not + i18N.login,
      avatar: '/img/avatar-min-img.png'
    },
    items: [
      { title: i18N.logout }
    ]
  }),
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
            if (json.user !== undefined) { _this.user = json.user }
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
      const _this = this
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

</style>
