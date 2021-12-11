import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VeeValidate from "vee-validate";
import VueLazyLoad from 'vue-lazyload';
import vueHeadful from 'vue-headful';
import InstantSearch from 'vue-instantsearch';
import Loading, { PluginApi } from 'vue-loading-overlay';

declare module 'vue/types/vue' {  export interface Vue {
    readonly $loading: PluginApi;
  } }

declare global {
  interface Window {
    grecaptcha: any
  }
}

axios.defaults.withCredentials = true; //needed for CORS
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; //needed for HTTP basic auth

Vue.config.productionTip = false;

Vue.component('vue-headful', vueHeadful);
Vue.component('loading', Loading); 

Vue.use(Loading);
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(VeeValidate, {classes: true , events: 'change'});
Vue.use(VueLazyLoad);
Vue.use(InstantSearch);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app'); 

