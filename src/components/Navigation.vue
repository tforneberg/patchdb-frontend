<template id="navbar">
    <b-navbar class="navbar" toggleable="md" fixed="top">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/">PatchDB</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item to="/" exact>Home</b-nav-item>
                <b-nav-item to="/latest">Latest</b-nav-item>
                <b-nav-item to="/about">About</b-nav-item>
            </b-navbar-nav> 

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>

                <b-nav-item-dropdown text="Language" id="languageDropdown" right type="dark">
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">DE</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item v-if="!isLoggedIn" to="/login">Login</b-nav-item>
                <b-nav-item v-if="!isLoggedIn" to="/register">Register</b-nav-item>    
                <b-nav-item-dropdown right id="userDropdown" v-if="isLoggedIn">
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                    <em>{{userName}}</em> 
                    </template>
                    <b-dropdown-item v-if="isLoggedIn" to="/user">Profile</b-dropdown-item>
                    <b-dropdown-item v-if="isLoggedIn" @click="logout">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>

</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class Navigation extends Vue {
        //props
        @Prop() private title? : string;
    
        menuCollapsed : boolean = true;
        showProfileDropdown : boolean = false;

        //methods
        toggleShowMenu() : void {
            this.menuCollapsed = !this.menuCollapsed
        }

        toggleProfileDropdown() : void {
            this.showProfileDropdown = !this.showProfileDropdown;
        }

        logout() : void {
            this.$store.dispatch('logout').then(() => {
                this.$router.push('/home');
            })
        }

        //computed
        get userName() : string {
            return this.$store.getters.loggedInUser.name;
        }

        get isLoggedIn() : boolean { 
            return this.$store.getters.isLoggedIn;
        }
    }
</script>

<style lang="scss">
#languageDropdown__BV_button_,
#userDropdown__BV_button_ {
    color: $gray-200 !important;
}

#languageDropdown__BV_button_:hover,
#userDropdown__BV_button_:hover {
    color: $gray-400 !important;
}

.show #languageDropdown__BV_button_,
.show #userDropdown__BV_button_ {
    color: $primary !important;
}

.dropdown-menu {
    outline: none !important;
    background-color: $gray-800 !important;
}

.dropdown-item {
    outline: none !important;
    background-color: $gray-800 !important;
}

.dropdown-item:hover, .dropdown-item:active {
    outline: none !important;
    background-color: $gray-700 !important;
}
</style>

<style scoped lang="scss">
.navbar {
    background-color: $gray-900;
    border-bottom: 1px solid white;
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
</style>