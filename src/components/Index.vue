<template>
  <div>
    <v-carousel
      height="200">
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
    <v-list two-line>
      <div class="text-xs-center" v-if="loading">
        <v-progress-circular
          indeterminate
          color="primary"
          class="loading-control"
        ></v-progress-circular>
      </div>
      <template v-for="(item,index) in articleData" v-else>
        <v-list-tile
          :key="item.id"
          avatar
        >
          <router-link :to="'/user/'+item.author.id">
            <v-list-tile-avatar>
              <img :src="i18N.domain+item.author.avatar">
            </v-list-tile-avatar>
          </router-link>
          <v-list-tile-content>
            <router-link :to="'/article/'+item.id">
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
      i18N: i18N, // i18N配置文件
      loading: true, // 是否加载中
      page: 1, // 当前页数
      size: 10, // 每页条数
      totalPage: 0, // 总页数
      totalElements: 0, // 总条数
      attribute: 'time', // 按什么排序
      direction: 'DESC', // 倒序
      articleData: [], // 文章数据
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ]
    }
  },
  methods: {
    getArticleData: function () {
      const _this = this
      _this.loading = true
      $.ajax({
        type: 'get',
        url: i18N.domain + '/article/index?page=' + _this.page +
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
          _this.loading = false
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
    color: #000;
  }

  .loading-control {
    margin: 50px 50px;
  }
</style>
