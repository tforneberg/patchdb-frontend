<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { User } from '@/model/User';
import { ChangePasswordRequestData } from '@/model/RequestData';
const namespace: string = 'AuthModule' //Vuex module namespace

@Component({components: { }, })
export default class SettingsView extends Vue { 
    private requestData = new ChangePasswordRequestData();

    private showClientSideValidationFaliedMessage = false;
    private showServerSideRegistrationFailedMessage = false;

    //Vuex getter binding generated properties
    @Getter('loggedInUser', { namespace }) 
    private loggedInUser?: User|null;

    resetFailMessages() : void {
        this.showServerSideRegistrationFailedMessage = false;
        this.showClientSideValidationFaliedMessage = false;
    }

    onChangePassword (event: any) : void {
        event.preventDefault();

        //validate form on client
        this.$validator.validate().then(formIsValid => {
        if (formIsValid && this.loggedInUser) {
            this.axios.patch('api/users/'+this.loggedInUser.id+'/changePassword', this.requestData)
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                    this.showServerSideRegistrationFailedMessage = true
                })
        } else {
            this.showClientSideValidationFaliedMessage = true;
        }
    });
  }
}
</script>


<template>
    <div>
        <h1>Settings</h1>
        <h4>Change password</h4>
        <form @submit="onChangePassword" novalidate @input="resetFailMessages">
            <div class="form-group" id="pwInputGroup">
                <label for="pwInput">Your Password:</label>
                <input type="password" class="form-control" id="pwInput" placeholder="Enter Password" name="password"
                v-model="requestData.password" v-validate="{ required: true, min: 6, max: 32 }">
                <small v-show="errors.has('password')" class="invalidMessage form-text">{{errors.first('password')}}</small>
            </div>
            <div class="form-group" id="pwInputGroup2">
                <label for="pwInput2">Your Password:</label>
                <input type="password" class="form-control" id="pwInput2" placeholder="Enter Password (again)" name="password2"
                v-model="requestData.password2" v-validate="{ required: true, confirmed: requestData.password, min: 6, max: 32 }" data-vv-as="password">
                <small v-show="errors.has('password2')" class="invalidMessage form-text">{{errors.first('password2')}}</small>
            </div>
            <div v-if="showServerSideRegistrationFailedMessage" id="serverSideRegistrationFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
                Changing the password was not successful. 
            </div>
            <div v-if="showClientSideValidationFaliedMessage" id="clientSideRFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
                Some fields are not correctly filled.<br>Please correct these errors, first.
            </div>
            <div class="text-center">
                <div><button type="submit" class="btn btn-primary">Submit</button></div>
            </div>
        </form>
    </div>
</template>


<style lang="scss" scoped>

</style>
