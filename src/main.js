import Vue from 'vue'
import App from './App.vue'

import voiceInputButton from './lib'

Vue.use(voiceInputButton, {
  appId: '327274c4',
  apiKey: 'd5ce8546f36d56e01227abe242dd6382',
  apiSecret: 'NjlmNzQyOTQ2NjlmMjdhZDM2YzRkZDRh'
})

new Vue({
  el: '#app',
  render: h => h(App)
})
