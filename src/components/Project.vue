<template>
  <div>
    <v-img :src="data.demand.cover" aspect-ratio="2.75"></v-img>
    <div class="text-xs-center mt-3">
      <h2>{{data.demand.title}}</h2>
    </div>
    <v-divider class="mt-3 mb-3"></v-divider>
    <v-layout mt-3 mb-3 wrap>
      <v-flex sm6 text-xs-center>
        <v-avatar size="32px" @click="tools.go('/user/'+data.applicant.id+'/article')">
          <img
            v-if="data.applicant.avatar !== undefined"
            :src="i18N.domain+data.applicant.avatar"
          >
        </v-avatar>
        <span v-if="data.applicant.nickname != ''">{{data.applicant.nickname}}</span>
        <span v-else>{{data.applicant.name}}</span>
      </v-flex>
      <v-flex sm6 text-xs-center>
        <v-avatar size="32px" @click="tools.go('/user/'+data.sponsor.id+'/article')">
          <img
            v-if="data.sponsor.avatar !== undefined"
            :src="i18N.domain+data.sponsor.avatar"
          >
        </v-avatar>
        <span v-if="data.sponsor.nickname != ''">{{data.sponsor.nickname}}</span>
        <span v-else>{{data.sponsor.name}}</span>
      </v-flex>
    </v-layout>
    <v-stepper v-model="data.status" vertical>
      <v-stepper-step :complete="data.status > 1" step="1">
        服务条款
        <small>最后更新与 2019年2月15日</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <div>
          <p>欢迎使用 智贝！</p>
          <p>感谢您使用我们的产品和服务（下称“服务”）。服务由智贝提供。</p>
          <p>您使用我们的服务即表示您已同意本条款。请仔细阅读。</p>
          <p>我们的服务范围非常广泛，因此有时还会适用一些附加条款或产品要求（包括年龄要求）。附加条款将会与相关服务一同提供，并且在您使用这些服务后，成为您与我们所达成的协议的一部分。</p>
        </div>
        <v-btn color="primary" @click="setStatus(2)">继续</v-btn>
        <v-btn flat @click="setStatus(1)">取消</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="data.status > 2" step="2">
        隐私与版权保护
        <small>最后更新与 2019年2月15日</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <div>
          <p>
            智贝 的隐私权政策介绍了您在使用我们的服务时，我们会如何处理您的个人数据和保护您的隐私。
            使用我们的服务即表示您同意 智贝 可以按照我们的隐私权政策使用您的个人数据。
          </p>
          <p>
            我们会根据《数字千年版权法》规定的流程，对涉嫌侵犯版权的通知作出回应并终止屡次侵权人的帐户。
          </p>
          <p>
            我们会向版权持有人提供信息，以帮助他们在线管理自己的知识产权。如果您认为有人侵犯了您的版权并希望通知我们，可以在我们的帮助中心内查阅有关提交通知的信息和 智贝 关于回应通知的政策。
          </p>
        </div>
        <v-btn color="primary" @click="setStatus(3)">继续</v-btn>
        <v-btn flat @click="setStatus(1)">取消</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="data.status > 3" step="3">
        免责声明
        <small>最后更新与 2019年2月15日</small>
      </v-stepper-step>

      <v-stepper-content step="3">
        <div>
          <p>
            我们在提供服务时将会尽到商业上合理水平的技能和注意义务，希望您会喜欢使用它们。但有些关于服务的事项恕我们无法作出承诺。
          </p>
          <p>
            除本条款或附加条款中明确规定的内容外，智贝 及其供应商和分销商对服务均不作任何具体承诺。例如，我们对服务中的内容、服务的具体功能，或其可靠性、可用性或满足您需要的能力不作任何承诺。服务是“按原样”提供的。
            某些司法管辖区域会规定特定保证，例如适销性、特定目的适用性及不侵权的默示保证。在法律允许的范围内，我们排除所有保证。
          </p>
        </div>
        <v-btn color="primary" @click="setStatus(4)">继续</v-btn>
        <v-btn flat @click="setStatus(2)">取消</v-btn>
      </v-stepper-content>

      <v-stepper-step step="4" :complete="data.status > 4">状态</v-stepper-step>
      <v-stepper-content step="4">
        <div>
          <p>对方已收到合作申请，请耐心等待</p>
        </div>
        <v-btn @click="setStatus(3)">放弃</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import i18N from '@/assets/i18N/i18N'
import $ from 'jquery'

export default {
  name: 'Project',
  data () {
    return {
      i18N: i18N,
      data: {
        status: 0,
        title: i18N.loading,
        applicant: {},
        sponsor: {}
      }
    }
  },
  methods: {
    setStatus (status) {
      let _this = this
      let _id = this.$route.params.id
      if (_id === undefined) {
        this.$router.push({path: '/NotFound'})
        return false
      }
      _this.loading = true
      $.ajax({
        type: 'get',
        url: i18N.domain + '/project/set?id=' + _id + '&status=' + status,
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            _this.getData()
          } else {
            alert(_this.tools.statusCodeToAlert(status))
          }
          _this.loading = false
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    },
    getData () {
      let _this = this
      let _id = this.$route.params.id
      if (_id === undefined) {
        this.$router.push({path: '/NotFound'})
        return false
      }
      _this.loading = true
      $.ajax({
        type: 'get',
        url: i18N.domain + '/project/normal?id=' + _id,
        dataType: 'json',
        async: true,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (json) {
          let status = json.status
          if (_this.tools.statusCodeToBool(status)) {
            _this.data = json.object
          } else {
            alert(_this.tools.statusCodeToAlert(status))
          }
          _this.loading = false
        },
        error: function () {
          alert(i18N.network + i18N.alert.error)
        }
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
</style>
