<template>
  <v-form
    id="loginForm"
    ref="form"
    v-model="valid"
    lazy-validation
    class="form-control"
  >
    <v-text-field
      name="name"
      v-model="name"
      :counter="10"
      :rules="nameRules"
      :label="i18N.attribute.user.name"
      required
    ></v-text-field>

    <v-text-field
      name="password"
      v-model="password"
      :rules="passwordRules"
      :label="i18N.attribute.user.password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      @click="validate"
    >
      {{i18N.login}}
    </v-btn>

    <v-btn
      color="error"
      @click="reset"
    >
      {{i18N.reset}}
    </v-btn>
  </v-form>
</template>

<script>
  import i18N from '../assets/i18N/i18N';
  import $ from 'jquery';

  export default {
    name: 'Login',
    data: () => ({
      i18N: i18N, // i18N配置文件
      domain: i18N.domain, // 请求地址
      valid: true,
      name: '',
      nameRules: [
        v => !!v || i18N.attribute.user.name + i18N.is + i18N.empty,
      ],
      password: '',
      passwordRules: [
        v => !!v || i18N.attribute.user.password + i18N.is + i18N.empty,
      ],
    }),
    methods: {
      validate() {
        if (this.$refs.form.validate()) {
          this.snackbar = true;
          $.ajax({
            type: 'post',
            url: i18N.domain + '/user/login',
            data: $('#loginForm').serialize(),
            dataType: 'json',
            async: false,
            crossDomain: true,
            xhrFields: {
              withCredentials: true,
            },
            success: function(json) {
              const status = json.status;
              if (status === 0) {
                alert(i18N.login);
              }
            },
            error: function() {
              alert(i18N.network + i18N.alert.error);
              return false;
            },
          });
        }
      },
      reset() {
        this.$refs.form.reset();
      },
    },
  };

</script>

<style scoped>
  .form-control {
    margin: 25px 25px;
  }
</style>
