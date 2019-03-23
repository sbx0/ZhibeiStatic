<template>
  <v-layout align-center>
    <v-flex sm4 text-xs-center>
      <v-btn
        flat
        icon
        :color="isLike"
        @click="click('like')"
      >
        <v-icon>thumb_up</v-icon>
      </v-btn>
    </v-flex>
    <v-flex sm4 text-xs-center>
      <v-btn
        flat
        icon
        :color="isDislike"
        @click="click('dislike')"
      >
        <v-icon>thumb_down</v-icon>
      </v-btn>
    </v-flex>
    <v-flex sm4 text-xs-center>
      <v-btn
        flat
        icon
        :color="isCollect"
        @click="click('collect')"
      >
        <v-icon>star</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'MoreFunction',
  props: [
    'path'
  ],
  data () {
    return {
      i18N: i18N,
      isLike: '',
      isDislike: '',
      isCollect: ''
    }
  },
  methods: {
    click (type) {
      let _this = this
      $.ajax({
        type: 'get',
        url: i18N.domain + '/function/run?path=' + _this.path + '&type=' + type,
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            _this.load()
          } else {
            alert(_this.tools.statusCodeToAlert(status))
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    },
    load () {
      let _this = this
      $.ajax({
        type: 'get',
        url: i18N.domain + '/function/load?path=' + _this.path,
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          _this.isLike = ''
          _this.isDislike = ''
          _this.isCollect = ''
          if (json.objects !== undefined) {
            let objects = json.objects
            for (let i = 0; i < objects.length; i++) {
              switch (objects[i].type) {
                case 'like':
                  _this.isLike = '#ff0b00'
                  break
                case 'dislike':
                  _this.isDislike = '#9c07ff'
                  break
                case 'collect':
                  _this.isCollect = '#ffbb00'
                  break
              }
            }
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    }
  },
  created () {
    this.load()
  }
}
</script>

<style scoped>
</style>
