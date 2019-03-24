<template>
  <div>
    <div class="text-xs-center" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="loading-control"
      ></v-progress-circular>
    </div>
    <v-jumbotron
      v-else
      color="#9e9e9e47"
      height="60px"
    >
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <v-icon>book</v-icon>
            <h3>{{i18N.table.tag+i18N.tree}}</h3>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <v-treeview
      :items="items"
      :active.sync="active"
      :open.sync="open"
      activatable
      active-class="primary--text"
      class="grey lighten-5"
      transition
    ></v-treeview>
  </div>
</template>

<script>
import i18N from '@/assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'TagTree',
  data () {
    return {
      i18N: i18N,
      loading: true,
      items: [],
      active: [],
      open: [],
      users: []
    }
  },
  watch: {
    active () {
      if (this.active[0] !== undefined) {
        this.tools.go('/tag/' + this.active[0] + '/question')
      }
    }
  },
  methods: {
    getFatherData: function () {
      let _this = this
      _this.loading = true
      let url = i18N.domain + '/tag/father'
      $.ajax({
        type: 'get',
        url: url,
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          _this.items = json.objects
          _this.loading = false
          _this.getChildData()
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
          return false
        }
      })
    },
    getChildData: function () {
      let _this = this
      for (let i = 0; i < _this.items.length; i++) {
        _this.loading = true
        let url = i18N.domain + '/tag/child?id=' + _this.items[i].id
        $.ajax({
          type: 'get',
          url: url,
          dataType: 'json',
          async: false,
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },
          success: function (json) {
            _this.loading = false
            _this.items[i]['children'] = json['objects' + _this.items[i].id]
          },
          error: function () {
            alert(i18N.network + i18N.alert.error)
            return false
          }
        })
      }
    }
  },
  created () {
    this.getFatherData()
  }
}
</script>

<style scoped>
</style>
