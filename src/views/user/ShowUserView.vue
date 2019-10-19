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

    get showMakeModButton() : boolean {
        return this.userIsAdmin() && this.user.status != UserStatus.admin && this.user.status != UserStatus.mod && this.user.status != UserStatus.blockedUser;
    }

    get showMakeUserButton() : boolean {
        return this.userIsAdmin() && this.user.status == UserStatus.mod;
    }

    get showSetBlockedButton() : boolean {
        return this.userIsAdminOrMod() && this.user.status != UserStatus.admin && this.user.status != UserStatus.mod && this.user.status != UserStatus.blockedUser;
    }

    get showUnblockButton() : boolean {
        return this.userIsAdminOrMod() && this.user.status == UserStatus.blockedUser;
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
        <h3>Role: {{user.status}}</h3>
        <b-button v-if="isLoggedInUser(user)" @click="editProfileButtonClicked()">Edit</b-button>
        <b-button v-if="showMakeModButton" @click="makeMod()">Set status to "Moderator"</b-button>
        <b-button v-if="showMakeUserButton" @click="makeUser()">Set status to "User"</b-button>
        <b-button v-if="showSetBlockedButton" @click="setBlocked()">Block this user</b-button>
        <b-button v-if="showUnblockButton" @click="unblock()">Unblock this user</b-button>
    </div>
</template>