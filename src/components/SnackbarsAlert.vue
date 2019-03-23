<template>
  <div id="app">
    <v-app id="inspire">
      <v-card>
        <v-snackbar
          v-model="snackbar"
          :color="color"
          :multi-line="mode === 'multi-line'"
          :timeout="timeout"
          :vertical="mode === 'vertical'"
        >
          {{ text }}
          <v-btn
            dark
            flat
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'SnackbarsAlert',
  data () {
    return {
      snackbar: false,
      color: 'info',
      mode: 'vertical',
      timeout: 6000,
      text: 'Hello, I\'m a snackbar'
    }
  }
}
</script>

<style scoped>
</style>
