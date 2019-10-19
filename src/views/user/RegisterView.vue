<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';
import { RegisterRequestData } from '@/model/Model';

@Component({ components: { }, })
export default class RegisterView extends Mixins(Constants) {
	private requestData = new RegisterRequestData();
	
	private showClientSideValidationFaliedMessage = false;
	private showServerSideRegistrationFailedMessage = false;

	created() : void {
        this.requestData.acceptedTerms = false;
    }

	resetFailMessages() : void {
		this.showServerSideRegistrationFailedMessage = false;
		this.showClientSideValidationFaliedMessage = false;
	}

	onSubmit (event: any) : void {
		event.preventDefault();

		//validate form on client
		this.$validator.validate().then(formIsValid => {
			if (formIsValid) {
				this.axios.post('api/users/register', this.requestData)
				.then(response => {
					console.log(response);

					this.$router.push('/registrationSuccessful');
				})
				.catch(err => {
					console.log(err);

					this.showServerSideRegistrationFailedMessage = true;
				})
			} else {
				this.showClientSideValidationFaliedMessage = true;
			}
		});
	}
}
</script>

<template><div>
	<vue-headful :title="+TITLE_PREFIX+'Register'"/>
	<div id="registerForm">
	<h4>Register</h4>
		<form @submit="onSubmit" novalidate @input="resetFailMessages">
			<div class="form-group" id="emailImputGroup">
				<label for="emailInput">Your E-Mail:</label>
				<input type="text" class="form-control" id="emailInput" placeholder="Enter E-Mail" name="email"
					v-model="requestData.email" v-validate="'required|email'">
				<small v-show="errors.has('email')" class="invalidMessage form-text">{{errors.first('email')}}</small>
			</div>
			<div class="form-group" id="nameInputGroup">
				<label for="nameInput">Your Name:</label>
				<input type="text" class="form-control" id="nameInput" placeholder="Enter Name" name="name"
					v-model="requestData.name" v-validate="'required|min:4|max:20'">
					<small v-show="errors.has('name')" class="invalidMessage form-text">{{errors.first('name')}}</small>
			</div>
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
			<div class="form-group">
				<div class="form-check">
					<input class="form-check-input" type="checkbox" value="" id="termsCheck" name="termsCheck" 
						v-model="requestData.acceptedTerms" v-validate="'required'" data-vv-as="field">
					<label class="form-check-label" for="termsCheck">
						I agree to the terms and conditions
					</label>
					<small v-show="errors.has('termsCheck')" class="invalidMessage form-text">{{errors.first('termsCheck')}}</small>
				</div>
			</div>
			<div v-if="showServerSideRegistrationFailedMessage" id="serverSideRegistrationFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
					Registration was not successfull. 
			</div>
			<div v-if="showClientSideValidationFaliedMessage" id="clientSideRFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
					Some fields are not correctly filled.<br>Please correct these errors, first.
			</div>
			<div class="text-center">
				<div><button type="submit" class="btn btn-primary">Submit</button></div>
			</div>
		</form>
	</div>
</div></template>

<style lang="scss" scoped>
#registerForm {
	max-width: 600px;
	margin-left: auto;
	margin-right: auto;
}

</style>
