<script lang="ts">
import Vue from 'vue';
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import { getModule } from 'vuex-module-decorators';
import AuthModule from '@/store/modules/AuthModule';
import { UserUtil } from '@/util/UserUtil';
import { Mixins, Component } from 'vue-property-decorator';

@Component({components: {Navigation, Footer}})
export default class App extends Mixins(UserUtil) {

    created() {
        this.configureAxiosRequestInterceptors();
        this.configureAxiosResponseInterceptors();
    }

    configureAxiosRequestInterceptors() {
        let vue = this;

        //if no csrf token is present, get the csrf cookie with an extra get-request before making any non-get requests
        this.axios.interceptors.request.use(async function(requestConfig) {
            let noXSRFTokenSavedYet:boolean = document.cookie.indexOf('XSRF-TOKEN') === -1;
            let isNoGETRequest:boolean = requestConfig !== undefined && requestConfig.method.localeCompare('get', undefined, {sensitivity: "accent"}) != 0;
            if (noXSRFTokenSavedYet && isNoGETRequest)
                await vue.axios.get(''); 
            return requestConfig;
        });
    }

    configureAxiosResponseInterceptors() {
        let vue = this;

        this.axios.interceptors.response.use(undefined, function (err) {
            return new Promise(function (resolve, reject) {
                if (err.response.status === 404) {
                    vue.$router.push("/notFound");
                }
                if (err.response.status === 401) {  //log user out if server sends 401 (unauthorized => token expired)
                    vue.logout();
                    vue.$router.push("/login");
                }
                throw err;
            });
        });
    }

}

</script>

<template>
  <div id="app">
    <Navigation title="PatchDB"/>
    <div id="mainContainer">
      <b-card id="mainCard">
        <transition name="fade" mode="out-in">
          <router-view :key="$route.fullPath"/>
        </transition>
      </b-card>
    </div>
    <Footer/>
  </div>
</template>

<style lang="scss">
$mainContainerMaxWidth: 1280px;
$mainContainerPadding: 20px;

#app {
    min-height:100%;
    position:relative;
}

#mainContainer {
    margin-left: auto;
    margin-right: auto;
    max-width: $mainContainerMaxWidth;
    padding-left: $mainContainerPadding;
    padding-right: $mainContainerPadding;
    padding-top: $header-height-on-small-displays + $mainContainerPadding !important; //header height plus some extra padding
    padding-bottom: $footer-height-on-small-displays + $mainContainerPadding; //footer height smaller than large screens plus some extra padding
    @media screen and (min-width: $break-lg){
        padding-top: $header-height-on-big-displays + $mainContainerPadding !important; //header height plus some extra padding
        padding-bottom: $footer-height-on-big-displays + $mainContainerPadding; //footer height on large and bigger screens plus some extra paddings
    }
}

#mainCard {
    min-height: 300px;
    background: $background-card;
  // background-attachment: fixed;
  // background-size: 100%;
  // background-image: url('assets/backgroundDenim.jpg');
}
</style>
