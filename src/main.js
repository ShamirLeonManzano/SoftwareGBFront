import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import {routes} from './routes/routes.js'
import axios from 'axios'
import {store} from '../store/store.js'
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.use(VueRouter)



Vue.config.productionTip = false
axios.defaults.baseURL = "https://softwaregb.herokuapp.com/api/"

const router = new VueRouter({
  //routes
  routes
})

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
