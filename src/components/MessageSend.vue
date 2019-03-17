<template>
  <div class="chat">
    <div id="chat_content" class="chat-body">
      <v-container>
        <div
          row
          wrap
          v-for="msg in message_data"
          v-bind:key="msg.id"
        >
          <v-layout v-if="msg.sendUser.id == user_id">
            <v-flex d-flex xs11>
              <div class="sender-card">
                {{ msg.content }}
              </div>
            </v-flex>
            <v-flex d-flex xs1>
              <v-avatar
                size="28"
              >
                <img
                  :src="i18N.domain+msg.sendUser.avatar"
                  :alt="msg.sendUser.name"
                >
              </v-avatar>
            </v-flex>
          </v-layout>
          <v-layout v-else>
            <v-flex d-flex xs1>
              <v-avatar
                size="28"
              >
                <img
                  :src="i18N.domain+msg.sendUser.avatar"
                  :alt="msg.sendUser.name"
                >
              </v-avatar>
            </v-flex>
            <v-flex d-flex xs11>
              <div class="receiver-card">
                {{ msg.content }}
              </div>
            </v-flex>
          </v-layout>
        </div>
        <v-form id="sendForm">
          <input name="receiveUser.id" :value="this.$route.params.id" style="display: none;">
          <v-text-field
            name="content"
            :label="i18N.attribute.message.content"
            v-model="content"
            v-on:keyup.enter="send()"
          ></v-text-field>
          <v-btn
            block
            color="success"
            @click="send()"
          >
            {{i18N.send}}
          </v-btn>
        </v-form>
      </v-container>
    </div>
  </div>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'MessageSend',
  data () {
    return {
      i18N: i18N,
      message_data: [],
      user_id: -1,
      toUser: {},
      content: '',
      timer: null
    }
  },
  created () {
    let _this = this
    let url = ''
    let path = _this.$router.currentRoute.path
    let pathRegExp = new RegExp('.*?((?:[a-z][a-z]+)).*?((?:[a-z][a-z]+))')
    let pathM = pathRegExp.exec(path)
    if (pathM != null) {
      let word1 = pathM[1]
      let word2 = pathM[2]
      path = '/' + word1.replace(/</, '&lt;') + '/' + word2.replace(/</, '&lt;')
    }
    if (path === '/user/message') {
      _this.canPost = false
      let id = '-1'
      let idRegExp = new RegExp('.*?(\\d+)')
      let idM = idRegExp.exec(_this.$router.currentRoute.path)
      if (idM != null) {
        id = idM[1].replace(/</, '&lt;')
      }
      url = i18N.domain + '/user/normal?id=' + id
    }
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
        let status = json.status
        if (_this.tools.statusCodeToBool(status)) {
          _this.toUser = json.object
        } else {
          alert(_this.tools.statusCodeToAlert(status))
        }
      },
      error: function () {
        alert(i18N.network + i18N.alert.error)
      }
    })
    this.receive()
    this.setTimer()
  },
  destroyed: function () {
    clearInterval(this.timer)
  },
  methods: {
    goBack: function () {
      this.$router.go(-1)
    },
    setTimer: function () {
      this.timer = setInterval(() => {
        this.receive()
      }, 3000)
      this.$nextTick(function () {
        this.scrollToBottom()
      })
    },
    receive: function () {
      let _this = this
      let url = ''
      let path = _this.$router.currentRoute.path
      let pathRegExp = new RegExp('.*?((?:[a-z][a-z]+)).*?((?:[a-z][a-z]+))')
      let pathM = pathRegExp.exec(path)
      if (pathM != null) {
        let word1 = pathM[1]
        let word2 = pathM[2]
        path = '/' + word1.replace(/</, '&lt;') + '/' + word2.replace(/</, '&lt;')
      }
      if (path === '/user/message') {
        _this.canPost = false
        let id = '-1'
        let idRegExp = new RegExp('.*?(\\d+)')
        let idM = idRegExp.exec(_this.$router.currentRoute.path)
        if (idM != null) {
          id = idM[1].replace(/</, '&lt;')
        }
        url = i18N.domain + '/message/receive?id=' + id
      }
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
          if (json.objects !== undefined) {
            _this.message_data = json.objects
            _this.user_id = json.user_id
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    },
    send: function () {
      let _this = this
      $.ajax({
        type: 'post',
        url: i18N.domain + '/message/send',
        data: $('#sendForm').serialize(),
        dataType: 'json',
        async: false,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            _this.content = ''
            _this.receive()
          } else {
            alert(_this.tools.statusCodeToAlert(status))
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
      this.$nextTick(function () {
        this.scrollToBottom()
      })
    },
    // 滚到底部
    scrollToBottom: function () {
      if ($('#chat_content')[0] !== undefined) {
        $('#chat_content').scrollTop($('#chat_content')[0].scrollHeight)
      }
    }
  }
}
</script>

<style scoped>
  .container {
    padding: 0px;
  }

  .chat {
    padding: 5px 5px 5px 5px;
    margin: 5px 5px 5px 5px;
  }

  .chat-body {
    background-color: #cdd6df;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin: 5px 5px 5px 5px;
    padding: 5px 5px 5px 5px;
    overflow: auto;
    min-height: 150px;
    max-height: 600px;
  }

  .sender-card {
    text-align: left;
    vertical-align: middle;
    font-size: 15px;
    padding-left: 10px;
    border-radius: 10px;
    margin-left: 50px;
    margin-bottom: 10px;
    background-color: #fff;
    line-height: 30px;
    min-height: 30px;
    border: 1px solid #ccd5df;
  }

  .receiver-card {
    text-align: left;
    vertical-align: middle;
    font-size: 15px;
    padding-left: 10px;
    border-radius: 10px;
    margin-right: 50px;
    margin-bottom: 10px;
    background-color: #fff;
    line-height: 30px;
    min-height: 30px;
    border: 1px solid #ccd5df;
  }
</style>
