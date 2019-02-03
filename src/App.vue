<template>
  <div id="app">
    <Navigation title="Tobes' VueStarterTemplate"/>
    <div id="mainContainer">
      <b-card>
        <transition name="fade" mode="out-in"><router-view/></transition>
      </b-card>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Navigation, Footer
  }, 
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout').then(() => { this.$router.push('/login') });
    }
  },
  created: function () {
    //if the access token has expired and server sends 401, log the user out (=destroy the local token)
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          //this.$store.dispatch('logout')
          logout();
        }
        throw err;
      });
    });
  }
}

</script>

<style lang="scss">
</style>
