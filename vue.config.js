module.exports = {
    css: {
      loaderOptions: {
        sass: {
          data: `
          @import '~bootstrap/dist/css/bootstrap.css';
          @import '~bootstrap-vue/dist/bootstrap-vue.css';
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";
          @import "@/styles/_global.scss";
          `
        }
      }
    }
  };