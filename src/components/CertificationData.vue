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
      <upload @return-data="getChildData" v-if="img === ''"></upload>
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
      <v-card color="purple" class="white--text" v-if="certification.passed == null">
        <v-layout row>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{i18N.under_review}}</div>
                <div>{{certification.type}}</div>
                <div>{{certification.info}}</div>
                <div>{{certification.start_time}}</div>
              </div>
            </v-card-title>
          </v-flex>
          <v-flex xs5>
            <v-img
              :src="certification.img"
              height="125px"
              contain
            ></v-img>
          </v-flex>
        </v-layout>
      </v-card>
      <v-card color="purple" class="white--text" v-if="certification.passed">
        <v-layout row>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{certification.info}}</div>
                <div>{{certification.type}}</div>
                <div>{{certification.end_time+' '+i18N.before_can_use}}</div>
              </div>
            </v-card-title>
          </v-flex>
          <v-flex xs5>
            <v-img
              :src="certification.img"
              height="125px"
              contain
            ></v-img>
          </v-flex>
        </v-layout>
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
            json.certification.start_time = _this.tools.formatDate(json.certification.start_time, 'yyyy-MM-dd')
            json.certification.end_time = _this.tools.formatDate(json.certification.end_time, 'yyyy-MM-dd')
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
