import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter } from 'vuex-class';
import { User, Patch, UserStatus } from '@/model/Model';
import { getModule } from 'vuex-module-decorators';
import AuthModule from '@/store/modules/AuthModule';

@Component
export class UserUtil extends Vue {

    @Getter('isLoggedIn', { namespace: 'AuthModule' })
    public isLoggedIn?: boolean;

    @Getter('loggedInUser', { namespace: 'AuthModule' })
    public loggedInUser: User;

    @Getter('patchIDs', { namespace: 'PatchModule' })
    public patchIDsOfLoggedInUser: number[];

    public isLoggedInUser(user:User): boolean {
        return this.loggedInUser && user && this.loggedInUser.id == user.id;
    }

    public userIsAdminOrMod(user:User = null) : boolean {
        user = user != null ? user : this.loggedInUser;
        return this.userIsAdmin(user) || this.userIsMod(user);
    }

    public userIsAdmin(user: User = null) : boolean {
        user = user != null ? user : this.loggedInUser;
        if (user != null && user.status != null) {
            if (user.status == UserStatus.admin) {
                return true;
            }
        }
        return false;
    }

    public userIsMod(user: User = null) : boolean {
        user = user != null ? user : this.loggedInUser;
        if (user != null && user.status != null) {
            if (user.status == UserStatus.mod) {
                return true;
            }
        }
        return false;
    }

    public loggedInUserHasPatch(patch:Patch) : boolean {
        return this.patchIDsOfLoggedInUser && this.patchIDsOfLoggedInUser.includes(patch.id);
    }

    public logout() : void {
        getModule(AuthModule).logout();
    }

}