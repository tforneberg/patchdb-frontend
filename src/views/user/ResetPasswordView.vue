<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';
import { ResetPasswordRequestData } from '@/model/Model';

@Component({ components: {  }, })
export default class ResetPasswordView extends Mixins(Constants) {
        
    private requestData:ResetPasswordRequestData = new ResetPasswordRequestData();

    private loader:any;
    private showSuccessMessage:boolean = false;
    private showClientSideErrorMessage:boolean = false;
    private showServerSideErrorMessage:boolean = false;

    created() : void { }

    resetFailMessages() : void {
        this.showServerSideErrorMessage = false;
        this.showClientSideErrorMessage = false;
        this.showSuccessMessage = false;
    }

    onSubmit(event: any) : void {
        event.preventDefault();

        //validate form on client
        this.$validator.validate().then(formIsValid => {
            if (formIsValid) {
                this.loader = this.$loading.show();

                window.grecaptcha.enterprise.ready(async () => {
                    //request recaptcha token
                    this.requestData.recaptchaToken = await window.grecaptcha.enterprise.execute(this.RECAPTCHA_SITE_KEY, {action: 'RESET_PASSWORD'});

                    //send request to backend
                    this.axios.post('/api/users/resetPassword', this.requestData).then(response => {
                        if (this.loader) this.loader.hide();
						console.log(response);

						this.showSuccessMessage = true;
					})
					.catch(err => {
                        if (this.loader) this.loader.hide();
						console.log(err);

						this.showServerSideErrorMessage = true;
					})
                });
            } else {
                this.showClientSideErrorMessage = true;
            }
        });
    }
}
</script>

<template><div>
    <vue-headful :title="TITLE_PREFIX+'Reset Password'"/>
    <div id="mainForm">
        <h4>Reset Password</h4>
        <form @submit="onSubmit" novalidate @input="resetFailMessages">
        <div class="form-group" id="nameInputGroup">
            <label for="nameInput">Your E-Mail:</label>
            <input type="text" class="form-control" :class="{ 'invalid' : showServerSideErrorMessage }" id="emailInput" placeholder="Enter E-Mail" name="email"
            v-model="requestData.email" v-validate="'required'">
            <small v-show="errors.has('email')" class="invalidMessage form-text">{{errors.first('email')}}</small>
        </div>
        <div v-if="showSuccessMessage" id="successMessage" class="alert alert-success mx-sm-5 text-center" role="alert">
            Thanks. We sent you a mail. Please activate the link inside this mail to reset your password.
        </div>
        <div v-if="showServerSideErrorMessage" id="serverSideLoginFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
            Reset of password was not successfull. 
        </div>
        <div v-if="showClientSideErrorMessage" id="clientSideFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
            Some fields are not correctly filled.<br>Please correct these errors, first.
        </div>
        <div class="text-center">
            <div><button type="submit" class="btn btn-primary">Submit</button></div>
        </div>
        </form>
    </div>
</div></template>

<style lang="scss" scoped>

#mainForm {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

button {
    margin: 6px;
    width: 200px;
}

</style>
