import Vue from 'vue'
import './plugins/vuelidate'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

window.app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
