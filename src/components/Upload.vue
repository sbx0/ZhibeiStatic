<template>
  <div>
    <v-btn>
      <file-upload
        ref="upload"
        v-model="files"
        :post-action="i18N.domain+'/file/upload'"
        @input-file="inputFile"
        @input-filter="inputFilter"
      >
        {{i18N.upload}}
      </file-upload>
    </v-btn>
  </div>
</template>

<script>
import i18N from '../assets/i18N/i18N'
import $ from 'jquery'

let VueUploadComponent = require('vue-upload-component')
export default {
  name: 'Upload',
  data () {
    return {
      i18N: i18N,
      files: []
    }
  },
  components: {
    FileUpload: VueUploadComponent
  },
  methods: {
    /**
       * Has changed
       * @param  Object|undefined   newFile   只读
       * @param  Object|undefined   oldFile   只读
       * @return undefined
       */
    inputFile: function (newFile, oldFile) {
      if (newFile && oldFile && newFile.xhr && !newFile.xhr.withCredentials) {
        newFile.xhr.withCredentials = true
      }
      // Automatically activate upload
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      }
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        let json = newFile.response
        let status = json.status
        if (this.tools.statusCodeToBool(status) || status === 7) {
          if (this.$router.currentRoute.path === '/my/upload') {
            let _this = this
            $.ajax({
              type: 'GET',
              url: i18N.domain + '/file/avatar?md5=' + json.md5,
              async: false,
              dataType: 'json',
              crossDomain: true,
              xhrFields: {
                withCredentials: true
              },
              success: function (json) {
                let status = json.status
                if (_this.tools.statusCodeToBool(status)) {
                  _this.$router.push({path: '/my'})
                }
                alert(_this.tools.statusCodeToAlert(status))
              },
              error: function () {
                alert(i18N.network + i18N.alert.error)
              }
            })
          } else if (this.$router.currentRoute.path === '/my/certification' ||
              this.$router.currentRoute.path === '/post/demand') {
            this.$emit('uploadUrl', i18N.domain + '/upload/' + json.type + '/' + json.name)
          }
        } else {
          alert(this.tools.statusCodeToAlert(status))
        }
      }
    },
    /**
       * Pretreatment
       * @param  Object|undefined   newFile   读写
       * @param  Object|undefined   oldFile   只读
       * @param  Function           prevent   阻止回调
       * @return undefined
       */
    inputFilter: function (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // 过滤不是图片后缀的文件
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent()
        }
      }
      // 创建 blob 字段 用于图片预览
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    }
  }
}
</script>

<style scoped>

</style>
