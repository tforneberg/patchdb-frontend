import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

