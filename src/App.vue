<script>
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';

export default {
  components: {
    Navigation, Footer
  }, 
  computed: {
    isLoggedIn : function() { return this.$store.getters.isLoggedIn }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout').then(() => { this.$router.push('/login') });
    }
  },
  created: function () {
    //get csrf token
    // axios({url: '', method: 'GET'});

    //if the access token has expired and server sends 401, log the user out (= destroy the local token)
    this.axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          logout();
        }
        throw err;
      });
    });

    //if no csrf cookie is avaialbe, first grab it from the backend before making any non-get requests
    this.axios.interceptors.request.use(async function(config) {
      if (document.cookie.indexOf('XSRF-TOKEN') !== -1 || config === undefined) { return config; }
      let noGET = config.method.localeCompare('get', undefined, {sensitivity: "accent"}) != 0;
        if (noGET) {
          const response = await axios.get(''); //gets the token
          return config;
        } else {
          return config;
        }
    });
  }
}

</script>

<template>
  <div id="app">
    <Navigation title="Tobes' VueStarterTemplate"/>
    <div id="mainContainer">
      <b-card>
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </b-card>
    </div>
    <Footer/>
  </div>
</template>

<style lang="scss">
</style>
