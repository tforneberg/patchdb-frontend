<script lang="ts">
import { Component, Vue, Prop, Watch, } from 'vue-property-decorator';
import { User } from '@/model/User';
import { Getter } from 'vuex-class';
const namespace: string = 'AuthModule' //Vuex module namespace

@Component({components: { },})
export default class ShowUserView extends Vue {
    @Prop() private username?: string;

    private user: any = null;

    //Vuex getter binding generated properties
    @Getter('loggedInUser', { namespace }) 
    private loggedInUser?: User|null;
    
    @Getter('isLoggedIn', { namespace })
    private isLoggedIn?: boolean;

    created() : void {
        this.axios.get('api/users/search/findByName?name='+this.username)
            .then(response => {
                this.user = response.data;
            })
            .catch(err => console.log(err));
    }

    get isOwnProfilePage() : boolean {
        if(this.loggedInUser && this.user && this.loggedInUser.id == this.user.id) {
            return true;
        } else {
            return false;
        }
    }

    editProfile() : void {
        this.$router.push('/user/edit/profile');
    }

}
</script>

<template>
    <div v-if="this.user !== null">
        <h1>Name: {{user.name}}</h1>
        <h3>Role: {{user.status}}</h3>
        <b-button v-if="isOwnProfilePage" @click="editProfile">Edit</b-button>
    </div>
</template>