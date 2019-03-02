<template>
  <div>
    <v-carousel
      height="200"
    >
      <v-carousel-item
        v-for="(img,i) in images"
        :key="i"
        :src="img.cover"
        @click="tools.go('/demand/'+img.id)"
      ></v-carousel-item>
    </v-carousel>
    <v-tabs
      slot="extension"
      v-model="currentItem"
      color="transparent"
      fixed-tabs
      slider-color="yellow"
    >
      <v-tab
        v-for="(item,key) in items"
        :key="key"
        :href="'#tab-' + item.index"
        @click="tabChange(item.index)"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import ArticleList from './ArticleList'
import $ from 'jquery'

export default {
  name: 'Index',
  components: {ArticleList},
  data () {
    return {
      i18N: i18N, // i18N配置文件
      images: [],
      currentItem: 'tab-Article',
      items: [
        {
          title: i18N.table.article,
          index: 'Article'
        },
        {
          title: i18N.table.demand,
          index: 'Demand'
        }
      ]
    }
  },
  methods: {
    getImg () {
      let _this = this
      $.ajax({
        type: 'get',
        url: i18N.domain + '/demand/normal/list?page=1' +
            '&size=4' +
            '&attribute=budget' +
            '&direction=DESC',
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          if (json.objects != null) {
            _this.images = json.objects
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
          return false
        }
      })
    },
    tabChange (index) {
      switch (index) {
        case 'Article':
          this.$router.push({path: '/article'})
          break
        case 'Demand':
          this.$router.push({path: '/demand'})
          break
        default:
          this.$router.push({path: '/article'})
          break
      }
    }
  },
  created () {
    let path = this.$router.currentRoute.path
    if (path === '/') {
      this.$router.push({path: '/article'})
    }
    switch (path) {
      case '/':
        this.currentItem = 'tab-Article'
        break
      case '/article':
        this.currentItem = 'tab-Article'
        break
      case '/demand':
        this.currentItem = 'tab-Demand'
        break
      default:
        this.currentItem = 'tab-Article'
        break
    }
    this.getImg()
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #000;
  }
</style>
