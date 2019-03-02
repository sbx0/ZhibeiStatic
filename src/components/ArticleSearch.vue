<template>
  <div>
    <v-form class="form-control">
      <v-text-field
        id="search"
        v-model="keyword"
        :label="i18N.search + i18N.table.article"
        :value="keyword"
        :placeholder="i18N.search_message"
        append-outer-icon="search"
        v-on:keyup.enter="search()"
        @click:append-outer="search()"
      ></v-text-field>
      <v-chip
        v-for="(s,key) in suggester"
        v-bind:key="key"
        @click="search(s)"
      >
        {{s}}
      </v-chip>
    </v-form>
    <v-list two-line v-if="data.length > 0">
      <div class="text-xs-center" v-if="loading">
        <v-progress-circular
          indeterminate
          color="primary"
          class="loading-control"
        ></v-progress-circular>
      </div>
      <template v-for="(item,index) in data" v-else>
        <v-list-tile
          :key="item.id"
          avatar
        >
          <v-list-tile-avatar
            @click="tools.go('/user/'+item.author.id+'/article')"
          >
            <img v-if="item.author.avatar !== undefined" :src="i18N.domain+item.author.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content
            @click="tools.go('/article/'+item.id)"
          >
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.introduction"></v-list-tile-sub-title>
            <v-list-tile-sub-title>
              {{tools.timeShow(item.time)}}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <hr v-bind:key="index+'hr'" class="v-divider v-divider--inset theme--light">
      </template>
    </v-list>
  </div>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'ArticleSearch',
  data () {
    return {
      i18N: i18N, // i18N配置文件
      loading: false, // 是否加载中
      keyword: '',
      data: [],
      suggester: []
    }
  },
  methods: {
    suggest: function () {
      let _this = this
      if (_this.keyword !== null) {
        _this.loading = true
        $.ajax({
          type: 'get',
          url: i18N.domain + '/article/suggest?keyword=' + _this.keyword,
          dataType: 'json',
          async: true,
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },
          success: function (json) {
            _this.suggester = json.suggest
            _this.loading = false
          },
          error: function () {
            alert(i18N.network + i18N.alert.error)
          }
        })
      }
    },
    search: function (s) {
      let _this = this
      if (s != null) {
        _this.keyword = s
      }
      _this.suggest()
      if (_this.keyword !== null) {
        _this.loading = true
        $.ajax({
          type: 'get',
          url: i18N.domain + '/article/search?keyword=' + _this.keyword,
          dataType: 'json',
          async: true,
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },
          success: function (json) {
            _this.data = json.result
            _this.loading = false
          },
          error: function () {
            alert(i18N.network + i18N.alert.error)
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

  a {
    text-decoration: none;
    color: #000;
  }

  .loading-control {
    margin: 50px 50px;
  }
</style>
