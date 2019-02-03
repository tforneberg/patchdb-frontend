<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { LoginRequestData } from '@/model/RequestData';

@Component({ components: { }, })
export default class LoginView extends Vue {
  private requestData = new LoginRequestData();

  private showClientSideValidationFaliedMessage = false;
  private showServerSideLoginFailedMessage = false;

  resetFailMessages() : void {
    this.showServerSideLoginFailedMessage = false;
    this.showClientSideValidationFaliedMessage = false;
  }

  onSubmit(event: any) : void {
    event.preventDefault();

    //validate form on client
    this.$validator.validate().then(formIsValid => {
      if (formIsValid) {
        this.$store.dispatch('AuthModule/login', this.requestData)
          .then(() => this.$router.push('/'))
          .catch(err => this.showServerSideLoginFailedMessage = true)
      } else {
        this.showClientSideValidationFaliedMessage = true;
      }
    });
  }

  onForgotPassword() : void {
    this.$router.push('/forgotPassword');
  }
}
</script>

<template><div>
  <div id="loginForm">
    <h4>Login</h4>
    <form @submit="onSubmit" novalidate @input="resetFailMessages">
      <div class="form-group" id="nameInputGroup">
        <label for="nameInput">Your Name:</label>
        <input type="text" class="form-control" :class="{ 'invalid' : showServerSideLoginFailedMessage }" id="nameInput" placeholder="Enter Name" name="name"
          v-model="requestData.name" v-validate="'required'">
          <small v-show="errors.has('name')" class="invalidMessage form-text">{{errors.first('name')}}</small>
      </div>
      <div class="form-group" id="pwInputGroup">
        <label for="pwInput">Your Password:</label>
        <input type="password" class="form-control" :class="{ 'invalid' : showServerSideLoginFailedMessage }" id="pwInput" placeholder="Enter Password" name="password"
          v-model="requestData.password" v-validate="'required'">
          <small v-show="errors.has('password')" class="invalidMessage form-text">{{errors.first('password')}}</small>
      </div>
      <div v-if="showServerSideLoginFailedMessage" id="serverSideLoginFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
        Login was not successfull. 
      </div>
      <div v-if="showClientSideValidationFaliedMessage" id="clientSideFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
        Some fields are not correctly filled.<br>Please correct these errors, first.
      </div>
      <div class="text-center">
        <div><button type="submit" class="btn btn-primary">Login</button></div>
        <div><button type="button" @click="onForgotPassword" class="btn btn-primary">Forgot password</button></div>
      </div>
    </form>
  </div>
</div></template>


<style lang="scss" scoped>

#loginForm {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

button {
  margin: 6px;
  width: 200px;
}


</style>
