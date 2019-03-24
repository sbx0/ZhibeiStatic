<template>
  <div v-if="!not_yet">
    <div class="text-xs-center" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="loading-control"
      ></v-progress-circular>
    </div>
    <v-form
      id="certificationForm"
      v-else
    >
      <v-select
        v-model="select"
        :hint="`${select.text}, ${select.value}`"
        :items="i18N.certification_type"
        :label="i18N.attribute.certification.type"
        return-object
        item-text="text"
        item-value="value"
      ></v-select>
      <select :value="select.value" style="display: none;" name="type">
        <option v-for="certification in i18N.certification_type" :value="certification.value"
                v-bind:key="certification.value">
          {{certification.text}}
        </option>
      </select>
      <v-text-field
        :label="i18N.attribute.certification.info"
        name="info"
      ></v-text-field>
      <v-text-field
        :label="i18N.attribute.certification.license"
        name="license"
      ></v-text-field>
      <input type="text" name="img" :value="img" style="display: none;">
      <label>{{i18N.certification_file_alert}}</label>
      <v-img
        v-if="img !== ''"
        :src="img"
      ></v-img>
      <upload @uploadUrl="getChildData" v-if="img === ''"></upload>
    </v-form>
  </div>
  <div v-else>
    <div class="text-xs-center" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="loading-control"
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-card
        v-if="certification.passed == null"
        class="mt-3 mx-auto text-xs-center"
        max-width="400"
      >
        <v-sheet
          dark
          class="v-sheet--offset mx-auto mb-3"
          color="success"
          elevation="12"
          max-width="calc(100% - 32px)"
        >
          <h3>{{certification.type}}</h3>
        </v-sheet>
        <v-card-text class="pt-0">
          <div class="title font-weight-light mb-2">{{certification.info}}</div>
          <div class="subheading font-weight-light grey--text">{{i18N.under_review}}</div>
          <v-divider class="my-2"></v-divider>
          <v-icon
            class="mr-2"
            small
          >
            mdi-clock
          </v-icon>
          <span class="caption grey--text font-weight-light">{{certification.startTime}}</span>
        </v-card-text>
      </v-card>
      <v-card
        v-if="certification.passed"
        class="mt-3 mx-auto text-xs-center"
        max-width="400"
      >
        <v-sheet
          dark
          class="v-sheet--offset mx-auto mb-3"
          color="success"
          elevation="12"
          max-width="calc(100% - 32px)"
        >
          <h3>{{certification.type}}</h3>
        </v-sheet>
        <v-card-text class="pt-0">
          <div class="title font-weight-light mb-2">{{certification.info}}</div>
          <div class="subheading font-weight-light grey--text"></div>
          <v-divider class="my-2"></v-divider>
          <v-icon
            class="mr-2"
            small
          >
            mdi-clock
          </v-icon>
          <span class="caption grey--text font-weight-light">{{certification.endTime+' '+i18N.before_can_use}}</span>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import i18N from '@/assets/i18N/i18N'
import $ from 'jquery'
import Upload from '@/components/Upload'

export default {
  name: 'CertificationData',
  components: {Upload},
  data () {
    return {
      i18N: i18N,
      select: {},
      img: '',
      loading: false,
      not_yet: true,
      certification: {}
    }
  },
  methods: {
    getChildData (data) {
      this.img = data
    },
    getCertification () {
      let _this = this
      _this.loading = true
      $.ajax({
        type: 'get',
        url: i18N.domain + '/certification/status',
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            let type = _this.i18N.certification_type
            for (let i = 0; i < type.length; i++) {
              if (type[i].value === json.certification.type) {
                json.certification.type = type[i].text
              }
            }
            _this.certification = json.certification
            _this.not_yet = true
            _this.loading = false
          } else {
            _this.not_yet = false
            _this.loading = false
          }
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    }
  },
  created () {
    this.getCertification()
  }
}
</script>

<style scoped>

</style>
