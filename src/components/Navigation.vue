<script lang="ts">
    import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
    import AuthModule from '@/store/modules/AuthModule';
    import { User } from '@/model/Model';
    import { UserUtil } from '@/util/UserUtil';

    @Component
    export default class Navigation extends Mixins(UserUtil) {
        private menuCollapsed : boolean = true;
        private showProfileDropdown : boolean = false;

        @Prop() private title?: string;

        toggleShowMenu() : void {
            this.menuCollapsed = !this.menuCollapsed
        }

        toggleProfileDropdown() : void {
            this.showProfileDropdown = !this.showProfileDropdown;
        }

        logout() : void {
            getModule(AuthModule).logout()
            .then(() => {
                this.$router.push('/');
            });
        }
    }
</script>


<template><nav>
    <b-navbar class="navbar" toggleable="lg" fixed="top">
    <div class="container">
        <b-navbar-toggle class="custom-toggler" target="nav_collapse_header"></b-navbar-toggle>
        <b-navbar-brand to="/">{{title}}</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse_header">

            <!-- Left aligned nav items -->
            <b-navbar-nav>
                <b-nav-item-dropdown id="languageDropdown" right>
                    <template slot="button-content">
                        Patches
                    </template>
                    <b-dropdown-item to="/latest">Latest</b-dropdown-item>
                    <b-dropdown-item to="/hottest">Hottest</b-dropdown-item>
                    <b-dropdown-item to="/patches/search">Search</b-dropdown-item>
                    <b-dropdown-item to="/add/patch" v-if="isLoggedIn">Add Patch</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown id="languageDropdown" right>
                    <template slot="button-content">
                        Community
                    </template>
                    <b-dropdown-item to="/users">Users</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item to="/news">News</b-nav-item>
            </b-navbar-nav> 

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown v-if="false" id="languageDropdown" right>
                    <template slot="button-content">
                        Language
                    </template>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">DE</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item v-if="!isLoggedIn" to="/login">Login</b-nav-item>
                <b-nav-item v-if="!isLoggedIn" to="/register">Register</b-nav-item>    
                
                <b-nav-item-dropdown right id="userDropdown" v-if="isLoggedIn">
                    <template slot="button-content">
                        <b>{{loggedInUser.name}}</b>
                    </template>
                    <b-dropdown-item to="/overview">Overview</b-dropdown-item>
                    <b-dropdown-item :to="'/user/'+loggedInUser.id" exact>My Profile</b-dropdown-item>
                    <b-dropdown-item :to="'/user/'+loggedInUser.id+'/collection'" exact>My Collection</b-dropdown-item>
                    <b-dropdown-item v-if="userIsAdminOrMod()" to="/patches/approvalNeeded" >Approve new patches</b-dropdown-item>
                    <b-dropdown-item to="/settings">Settings</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

            <!-- Search bar -->
            <b-navbar-nav>
                <b-nav-form>
                    <b-form-input id="searchbar" size="sm" class="my-2 mr-2 ml-lg-3 mr-lg-2 mx-lg-2" type="text" placeholder="Search"/>
                    <b-button variant="primary" size="sm" class="my-2" type="submit">Search</b-button>
                </b-nav-form>
            </b-navbar-nav>

        </b-collapse></div>
    </b-navbar></nav>
</template>

<style lang="scss">
#languageDropdown__BV_button_,
#userDropdown__BV_button_ {
    color: $gray-200 !important;
}

#languageDropdown__BV_button_:hover,
#userDropdown__BV_button_:hover {
    //color for dropdown title
    color: $gray-400 !important;
}

.show > #languageDropdown__BV_button_,
.show > #userDropdown__BV_button_ {
    //color for opened dropdown title
    color: $primary !important;
    &:hover, &:active{
        outline: none !important;
    }
}

.dropdown-menu {
    border-radius: 0%;
    border: none;
    box-shadow: 0px 0px 6px $gray-800;
}

.dropdown-menu,
.dropdown-item {
    outline: none !important;
    background-color: $gray-800 !important;
}

.dropdown-item:hover, .dropdown-item:active {
    outline: none !important;
    background-color: $gray-700 !important;
}

.custom-toggler .navbar-toggler-icon { //color needs to be manually adjusted, there, $primary doesnt work...
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(43, 160, 121, 1)' stroke-width='1' stroke-linecap='square' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}

.custom-toggler:hover .navbar-toggler-icon { //color needs to be manually adjusted, there, $primary doesnt work...
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 1)' stroke-width='1' stroke-linecap='square' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}

.custom-toggler.navbar-toggler {
  border-color: rgba($primary, 1);
  border-radius: 0%;
} 
</style>

<style scoped lang="scss">
.navbar {
    background-color: $gray-800;
    border-bottom: 2px solid $primary;  
    box-shadow: 0px 2px 7px $gray-600;
}

#searchbar {
    min-width: 150px;
    max-width: 300px;
}
 
.nav-link, a {
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

button:hover {
    background-color: $primary !important;
}
</style>