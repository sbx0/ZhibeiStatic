<template>
  <div>
    <v-carousel
      height="200"
    >
      <v-carousel-item
        v-for="(img,i) in imgs"
        :key="i"
        :src="img.src"
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
import ArticleList from './ArticleList'

export default {
  name: 'Index',
  components: {ArticleList},
  data () {
    return {
      i18N: i18N, // i18N配置文件
      imgs: [
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
      ],
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
      ],
      tabChange (index) {
        switch (index) {
          case 'Article':
            this.$router.push({path: '/article'})
            break
          case 'Demand':
            this.$router.push({path: '/demand'})
            break
          default:
            this.$router.push({path: '/'})
            break
        }
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
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #000;
  }
</style>
