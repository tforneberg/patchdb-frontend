<template>
  <div id="app">
    <Navigation title="PatchDB"/>
    <router-view class="container" id="routerView"/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
    Navigation
  }, 
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login')
      })
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
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
// }
</style>
