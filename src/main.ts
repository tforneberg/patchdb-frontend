import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VeeValidate from "vee-validate";

axios.defaults.withCredentials = true; //needed for CORS
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; //needed for HTTP basic auth
axios.defaults.baseURL = store.state.backend;

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(VeeValidate, {classes: true , events: 'change'});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app'); 

