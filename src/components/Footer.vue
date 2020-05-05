<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class Footer extends Vue {
        private menuCollapsed : boolean = true;

        toggleShowMenu() : void {
            this.menuCollapsed = !this.menuCollapsed
        }
    }
</script>

<template><nav>
    <b-navbar class="footer" toggleable="lg"><div class="container">
        <b-navbar-nav>
            <b-nav-item to="/imprint" exact>Imprint</b-nav-item>
            <b-nav-item to="/terms">Terms and Conditions</b-nav-item>
        </b-navbar-nav> 
        <b-navbar-nav class="ml-auto">
            <b-nav-item disabled>Copyright 2019 Tobias Forneberg</b-nav-item>
        </b-navbar-nav>
    </div></b-navbar>
</nav></template>

<style scoped lang="scss">
.footer {
    font-size: 0.85rem;
    line-height: 0.75;
    background-color: $gray-900;
    border-top: 2px solid $primary;
    box-shadow: 0px -1px 6px $gray-600;
    clear: both;
    padding-top: 10px;
    position:absolute;
    bottom:0;
    width: 100%;
    height: $footer-height-on-small-displays;
    @media screen and (min-width: $break-lg){
      height: $footer-height-on-big-displays;
    }
}
 
.nav-link, a, .copyright {
    color: $gray-200 !important;
}

.nav-link:hover, a:hover {
    outline: none !important;
    color: $gray-400 !important;
}

.nav-link.active, a.active {
    outline: none !important;
    color: $primary !important;
}
</style>