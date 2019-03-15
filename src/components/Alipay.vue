<template>
  <v-app>
    <form id="alipayment">
      <v-jumbotron
        dark
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        height="100px"
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
              <h3 class="display-3">{{i18N.give_me_power}}</h3>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
      <input name="id" :value="product" hidden/>
      <v-radio-group v-model="product">
        <v-radio
          v-for="p in products"
          v-bind:key="p.id"
          :label="p.name +' - '+ p.price + '￥'"
          :value="p.id"
        >
        </v-radio>
      </v-radio-group>
      <div class="text-xs-center">
        <v-btn
          @click="toPay()"
          round
          color="primary"
          dark
        >{{i18N.give_me_power}}</v-btn>
      </div>
    </form>
  </v-app>
</template>

<script>
import i18N from '@/assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'Alipay',
  data () {
    return {
      i18N: i18N,
      result: '',
      product: null,
      products: []
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts: function () {
      let _this = this
      $.ajax({
        type: 'get',
        url: i18N.domain +
            '/product/normal/list?page=1' +
            '&size=5' +
            '&attribute=price' +
            '&direction=ASC',
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          if (json.objects != null) {
            _this.products = json.objects
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
          return false
        }
      })
    },
    toPay: function () {
      let _this = this
      $.ajax({
        type: 'post',
        url: i18N.domain + '/alipay/pay',
        data: $('#alipayment').serialize(),
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          _this.result = json.result
          document.write(json.result)
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
