<template>
  <div>
    <div class="text-xs-center" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="loading-control"
      ></v-progress-circular>
    </div>
    <v-app v-else>
      <v-jumbotron
        color="#9e9e9e47"
        height="60px"
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
              <v-icon>assignment</v-icon>
              <h3>{{i18N.post+i18N.table.demand}}</h3>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
      <v-form
        id="postForm"
        ref="form"
        v-model="valid"
        lazy-validation
        class="form-control"
      >
        <input type="text" name="cover" :value="img" style="display: none;">
        <label>{{i18N.attribute.demand.cover}}</label>
        <v-img
          v-if="img !== ''"
          :src="img"
        ></v-img>
        <!--<upload @uploadUrl="getChildData" v-if="img === ''"></upload>-->
        <upload-avatar
          @uploadData="getChildData"
          v-if="img === ''"
          w="24.75"
          h="9"
          :t="i18N.upload+i18N.attribute.demand.cover"
        ></upload-avatar>
        <v-text-field
          name="title"
          v-model="title"
          :rules="titleRules"
          :label="i18N.attribute.demand.title"
          required
        ></v-text-field>
        <v-text-field
          name="budget"
          type="number"
          prefix="￥"
          v-model="budget"
          :rules="budgetRules"
          :label="i18N.attribute.demand.budget"
          required
        ></v-text-field>
        <textarea name="content" :value="content" hidden></textarea>
        <select name="tags" multiple style="display: none;">
          <option v-for="(tag,key) in tagsSelected" v-bind:key="key" :value="tag" selected>
            {{tag}}
          </option>
        </select>
        <v-select
          :label="i18N.attribute.demand.tags"
          :items="tags"
          v-model="tagsSelected"
          item-text="name"
          item-value="id"
          attach
          chips
          multiple
        ></v-select>
        <v-menu
          ref="endTimeMenu"
          v-model="endTimeMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            :label="i18N.attribute.demand.endTime"
            name="endTime"
            v-model="endTime"
            slot="activator"
            prepend-icon="event"
          ></v-text-field>
          <v-date-picker v-model="endTime" no-title @input="endTimeMenu = false"></v-date-picker>
        </v-menu>
      </v-form>
      <mavon-editor v-model="content" ref=md @imgAdd="imgAdd"/>
      <v-btn
        :disabled="!valid"
        color="success"
        @click="validate"
      >
        {{i18N.post}}
      </v-btn>
    </v-app>
  </div>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import Upload from '@/components/Upload'
import axios from 'axios'
import $ from 'jquery'
import UploadAvatar from '@/components/AvatarUpload'

export default {
  name: 'DemandPost',
  components: {UploadAvatar, Upload},
  data () {
    return {
      i18N: i18N, // i18N配置文件
      valid: true,
      loading: true,
      title: '',
      img: '',
      tags: [],
      tagsSelected: [],
      titleRules: [
        v => !!v || i18N.attribute.demand.title + i18N.is + i18N.empty
      ],
      content: '',
      budget: '0',
      budgetRules:
          [
            v => !!v || i18N.attribute.demand.budget + i18N.is + i18N.empty
          ],
      endTimeMenu: false,
      date: new Date().toISOString().substr(0, 10),
      endTime: ''
    }
  },
  methods: {
    getChildData (data) {
      this.img = data.url
    },
    // 绑定@imgAdd event
    imgAdd (pos, $file) {
      let _this = this
      // 第一步.将图片上传到服务器.
      let imgData = new FormData()
      imgData.append('file', $file)
      axios.defaults.withCredentials = true
      axios({
        url: i18N.domain + '/file/upload',
        method: 'post',
        data: imgData,
        headers: {'Content-Type': 'multipart/form-data'},
        crossDomain: true
      }).then(function (response) {
        let status = response.data.status
        if (_this.tools.statusCodeToBool(status) || status === 7) {
          let url = i18N.domain + '/upload/' + response.data.type + '/' + response.data.name
          _this.$refs.md.$img2Url(pos, url)
        }
      })
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.post()
      }
    },
    getTags () {
      let _this = this
      $.ajax({
        type: 'get',
        url: i18N.domain + '/tag/normal/list?page=1' +
          '&size=9999',
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            if (json.objects !== undefined) {
              _this.tags = json.objects
            }
          } else {
            alert(_this.tools.statusCodeToAlert(status))
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    },
    getInfo () {
      let _this = this
      _this.loading = true
      $.ajax({
        type: 'get',
        url: i18N.domain + '/user/info',
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            if (json.user !== undefined) {
              _this.user = json.user
            }
          } else {
            _this.$router.push({path: '/login'})
          }
          _this.loading = false
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    },
    post: function () {
      let _this = this
      $.ajax({
        type: 'post',
        url: i18N.domain + '/demand/post',
        data: $('#postForm').serialize(),
        dataType: 'json',
        async: false,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            _this.$router.push({path: '/demand'})
          } else {
            alert(_this.tools.statusCodeToAlert(status))
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
          return false
        }
      })
    }
  },
  created () {
    this.getInfo()
    this.getTags()
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .form-control {
    margin: 25px 25px;
  }

  .loading-control {
    margin: 50px 50px;
  }

  .v-note-wrapper {
    z-index: 0;
  }
</style>
