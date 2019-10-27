<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import { Constants } from '@/util/Constants';
import { User, UserStatus } from '@/model/Model';
import { UserUtil } from '@/util/UserUtil';
import AuthModule from '@/store/modules/AuthModule';

@Component({components: { },})
export default class ShowUserView extends Mixins(UserUtil, Constants) {
    @Prop() private id?: string;

    private user: User = null;

    created() : void {
        this.axios.get('api/users/'+this.id)
            .then(response => {
                this.user = response.data;
            })
            .catch(err => console.log(err));
    }

    get isOwnUsersPage() : boolean {
        return Number(this.id) == this.loggedInUser.id;
    }

    get showUnmakeModButton() : boolean {
        return this.userIsAdmin() && this.user.status == UserStatus.mod;
    }

    get showUnblockButton() : boolean {
        return this.user.status == UserStatus.blockedUser;
    }

    private editProfileButtonClicked() : void {
        this.$router.push('/user/edit/profile');
    }

    private makeMod() : void {
        this.changeRoleTo(UserStatus.mod);
    }

    private makeUser() : void {
        this.changeRoleTo(UserStatus.user);
    }

    private setBlocked() : void {
        this.changeRoleTo(UserStatus.blockedUser);
    }

    private unblock() : void {
        this.changeRoleTo(UserStatus.user);
    }

    private changeRoleTo(userStatus:UserStatus) {
        let request = new User();
        request.status = userStatus;
        this.axios.patch('api/users/'+this.id, request)
            .then(response => {
                this.user = response.data;
            })
            .catch(err => console.log(err));
    }
}
</script>

<template>
    <div v-if="user !== null">
        <vue-headful :title="TITLE_PREFIX+'User: '+user.name"/>
        <h1>Name: {{user.name}}</h1>
        <h3>Role: <transition name="fade" mode="out-in"><span :key="user.status">{{user.status}}</span></transition></h3>
        <p>
            <ul>
                <li><router-link :to="{name: 'collection', params: {id: this.id} }">{{user.name}}'s Collection</router-link></li>
                <li><router-link :to="{name: 'patchesCreatedByUser', params: {id: this.id} }">Patches created by {{user.name}}</router-link></li>
            </ul>
        </p>
        <p> 
            <b-button v-if="isLoggedInUser(user)" @click="editProfileButtonClicked()">Edit</b-button>
            <span v-if="userIsAdmin && !isOwnUsersPage" id="setUnsetModeratorButtons">
                <transition name="fade" mode="out-in">
                    <b-button key="1" v-if="showUnmakeModButton" @click="makeUser()">Set status to "User"</b-button>
                    <b-button key="2" v-else @click="makeMod()">Set status to "Moderator"</b-button>
                </transition>
            </span>
            
            <transition name="fade"></transition>
            <span v-if="userIsAdminOrMod && !isOwnUsersPage" id="blockUnblockButtons">
                <transition name="fade" mode="out-in">
                    <b-button key="1" v-if="showUnblockButton" @click="unblock()">Unblock this user</b-button>
                    <b-button key="2" v-else @click="setBlocked()">Block this user</b-button>
                </transition>
            </span>
        </p>
    </div>
</template>