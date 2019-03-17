<template>
  <div>
    <v-carousel
      height="200"
      hide-delimiters
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
    <router-view></router-view>
  </div>
</template>

<script>
import i18N from '../assets/i18N/i18N'

export default {
  name: 'Index',
  data () {
    return {
      i18N: i18N, // i18N配置文件
      images: [
        {id: 13, cover: 'http://zb.sbx0.cn/upload/image/20190314135052392.jpg'},
        {id: 14, cover: 'http://zb.sbx0.cn/upload/image/20190314133156400.jpg'},
        {id: 15, cover: 'http://zb.sbx0.cn/upload/image/20190314133502162.jpg'},
        {id: 16, cover: 'http://zb.sbx0.cn/upload/image/20190314133850762.jpg'}
      ],
      currentItem: 'tab-Demand',
      dialog: false,
      items: [
        {
          title: i18N.table.demand,
          index: 'Demand'
        },
        {
          title: i18N.table.article,
          index: 'Article'
        }
      ]
    }
  },
  methods: {
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
      this.$router.push({path: '/demand'})
    }
    switch (path) {
      case '/':
        this.currentItem = 'tab-Demand'
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
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #000;
  }
</style>
