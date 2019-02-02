import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VeeValidate from "vee-validate";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(VeeValidate, {classes: true , events: 'change'});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

