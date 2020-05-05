module.exports = {
    outputDir: 'target/dist',
    lintOnSave: false,
    css: {
      loaderOptions: {
        sass: {
          data: `
          @import '~bootstrap/dist/css/bootstrap.css';
          @import '~bootstrap-vue/dist/bootstrap-vue.css';
          @import '~vue-image-lightbox/dist/vue-image-lightbox.min.css';
          @import '~vue-loading-overlay/dist/vue-loading.css';
          @import '~vue-search-select/dist/VueSearchSelect.css';
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";
          @import "@/styles/_global.scss";
          @import "@/styles/_global_buttons.scss";
          @import "@/styles/_global_forms.scss";
          `
        }
      }
    }, 
    configureWebpack: {
      devtool: 'source-map'
    },
    devServer: {
        // proxy: {
        //     'api/': {
        //     target: 'http://localhost:8080/api/', // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
        //     ws: true, // proxy websockets
        //     changeOrigin: true
        //     }
        // }
        proxy: 'http://localhost:8080'
    },
  };