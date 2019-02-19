<template>
  <div>
    <v-list two-line>
      <template v-for="(item,index) in articleData">
        <v-list-tile
          :key="item.id"
          avatar
        >
          <v-list-tile-avatar>
            <img :src="domain+item.author.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <router-link :to="{ name: 'Article', params: { id: item.id }}">
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
          </router-link>
            <v-list-tile-sub-title v-html="item.introduction"></v-list-tile-sub-title>
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
  name: 'Index',
  data () {
    return {
      // domain: 'http://localhost:8085', // 请求地址
      domain: 'https://zb.sbx0.cn', // 请求地址
      i18N: i18N, // i18N配置文件
      page: 1, // 当前页数
      size: 10, // 每页条数
      totalPage: 0, // 总页数
      totalElements: 0, // 总条数
      attribute: 'time', // 按什么排序
      direction: 'DESC', // 倒序
      articleData: [] // 文章数据
    }
  },
  methods: {
    getArticleData: function () {
      const _this = this
      $.ajax({
        type: 'get',
        url: _this.domain + '/article/index?page=' + _this.page +
            '&size=' + _this.size +
            '&attribute=' + _this.attribute +
            '&direction=' + _this.direction,
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          _this.articleData = json.objects
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
          return false
        }
      })
    }
  },
  created () {
    // 初始化文章数据
    this.getArticleData()
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color:#000;
  }
</style>
