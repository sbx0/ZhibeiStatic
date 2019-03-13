<template>
  <div>
    <v-toolbar
      dense
      scroll-off-screen
    >
      <v-btn icon @click="goBack()">
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
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
      content: '',
      timer: null
    }
  },
  created () {
    this.receive()
    this.setTimer()
  },
  destroyed: function () {
    clearInterval(this.timer)
  },
  methods: {
    setTimer: function () {
      this.timer = setInterval(() => {
        this.receive()
      }, 3000)
    },
    receive: function () {
      let _this = this
      $.ajax({
        type: 'get',
        url: i18N.domain + '/message/receive?id=' + _this.$route.params.id,
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
      this.$nextTick(function () {
        this.scrollToBottom()
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
    min-height: 450px;
    max-height: 600px;
  }

  .sender-card {
    text-align: right;
    vertical-align: middle;
    font-size: 15px;
    padding-right: 10px;
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
