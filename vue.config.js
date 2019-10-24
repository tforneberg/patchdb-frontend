module.exports = {
    lintOnSave: false,
    css: {
      loaderOptions: {
        sass: {
          data: `
          @import '~bootstrap/dist/css/bootstrap.css';
          @import '~bootstrap-vue/dist/bootstrap-vue.css';
          @import '~vue-image-lightbox/dist/vue-image-lightbox.min.css';
          @import '~vue-loading-overlay/dist/vue-loading.css';
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";
          @import "@/styles/_global.scss";
          `
        }
      }
    }, 
    configureWebpack: {
      devtool: 'source-map'
    } 
  };