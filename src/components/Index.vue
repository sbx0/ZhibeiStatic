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
    <article-list></article-list>
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
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #000;
  }
</style>
