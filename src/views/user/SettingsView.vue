<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';
import { UserUtil } from '@/util/UserUtil';
import { User, ChangePasswordRequestData } from '@/model/Model';

@Component({components: { }, })
export default class SettingsView extends Mixins(UserUtil, Constants) { 
    private requestData = new ChangePasswordRequestData();

    private showClientSideValidationFaliedMessage = false;
    private showServerSideErrorMessage = false;

    private resetFailMessages() : void {
        this.showServerSideErrorMessage = false;
        this.showClientSideValidationFaliedMessage = false;
    }

    private onChangePassword (event: any) : void {
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
                        this.showServerSideErrorMessage = true
                    })
            } else {
                this.showClientSideValidationFaliedMessage = true;
            }
        });
    }

    private onSubmitImageUpload(event : any) : void {
        event.preventDefault();

        this.$validator.validate().then(formIsValid => {
            if (formIsValid && this.loggedInUser) {
                var requestObject:any;
                //TODO create request object with image 

                this.axios.post('api/users/'+this.loggedInUser.id+'/uploadImage', requestObject)
                    .then(response => {
                        //TODO show success message, reset objects for next upload.
                    })
                    .catch (err => {
                        console.log(err);
                        this.showServerSideErrorMessage = true;
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
        <vue-headful :title="TITLE_PREFIX+'User Settings'"/>
        <h1>Settings</h1>
        <h4>Change password</h4> <!-- TODO make component from this form --> 
        <form @submit="onChangePassword" novalidate @input="resetFailMessages" class="mb-3">
            <div class="form-group col-md-4 col-sm-6" id="pwInputGroup">
                <label for="pwInput">Your Password:</label>
                <input type="password" class="form-control" id="pwInput" placeholder="Enter Password" name="password"
                v-model="requestData.password" v-validate="{ required: true, min: 6, max: 32 }">
                <small v-show="errors.has('password')" class="invalidMessage form-text">{{errors.first('password')}}</small>
            </div>
            <div class="form-group col-md-4 col-sm-6" id="pwInputGroup2">
                <label for="pwInput2">Your Password:</label>
                <input type="password" class="form-control" id="pwInput2" placeholder="Enter Password (again)" name="password2"
                v-model="requestData.password2" v-validate="{ required: true, confirmed: requestData.password, min: 6, max: 32 }" data-vv-as="password">
                <small v-show="errors.has('password2')" class="invalidMessage form-text">{{errors.first('password2')}}</small>
            </div>
            <div v-if="showServerSideErrorMessage" id="serverSideRegistrationFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
                Changing the password was not successful. 
            </div>
            <div v-if="showClientSideValidationFaliedMessage" id="clientSideRFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
                Some fields are not correctly filled.<br>Please correct these errors, first.
            </div>
            <div class="col-md-4 col-sm-6">
                <div><button type="submit" class="btn btn-primary">Save</button></div>
            </div>
        </form>

        <h4>Upload Image</h4>
        <p>Insert Image upload component when implemented</p>
    </div>
</template>


<style lang="scss" scoped>

</style>
