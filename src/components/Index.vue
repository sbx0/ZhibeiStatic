<template>
  <v-container fluid fill-height>
    <v-layout column>
      <v-carousel
        hidden
        hide-delimiters
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
        centered
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
          <v-icon>{{item.icon}}</v-icon>
          &nbsp;
          {{ item.title }}
        </v-tab>
      </v-tabs>
      <router-view></router-view>
    </v-layout>
  </v-container>
</template>

<script>
import i18N from '../assets/i18N/i18N'

export default {
  name: 'Index',
  data () {
    return {
      i18N: i18N, // i18N配置文件
      images: [],
      currentItem: 'tab-Article',
      dialog: false,
      items: [
        {
          title: i18N.table.article,
          index: 'Article',
          icon: 'book'
        },
        {
          title: i18N.table.question,
          index:
              'Question',
          icon:
              'question_answer'
        },
        {
          title: i18N.table.demand,
          index:
              'Demand',
          icon:
              'assignment'
        }
      ]
    }
  },
  methods: {
    tabChange (index) {
      switch (index) {
        case 'Question':
          this.$router.push({path: '/question'})
          break
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
    },
    routeChange () {
      this.currentItem = 'tab-Article'
      let path = this.$router.currentRoute.path
      if (path === '/') {
        this.$router.push({path: '/article'})
      }
      switch (path) {
        case '/':
          this.currentItem = 'tab-Demand'
          break
        case '/question':
          this.currentItem = 'tab-Question'
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
  },
  watch: {
    '$route' () {
      this.routeChange()
    },
    currentItem () {
      this.routeChange()
    }
  },
  created () {
    this.routeChange()
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #000;
  }
</style>
