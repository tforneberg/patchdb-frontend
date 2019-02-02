<template><div>
  <div id="loginForm">
    <h4>Login</h4>
    <form @submit="onSubmit" novalidate @input="loginFailed=false">
      <div class="form-group" id="nameInputGroup">
        <label for="nameInput">Your Name:</label>
        <input type="text" class="form-control" :class="{ 'invalid' : loginFailed }" id="nameInput" placeholder="Enter Name" name="name"
          v-model="name" v-validate="'required'">
          <small v-show="errors.has('name')" class="invalidMessage form-text">{{errors.first('name')}}</small>
      </div>
      <div class="form-group" id="pwInputGroup">
        <label for="pwInput">Your Password:</label>
        <input type="password" class="form-control" :class="{ 'invalid' : loginFailed }" id="pwInput" placeholder="Enter Password" name="password"
          v-model="password" v-validate="'required'">
          <small v-show="errors.has('password')" class="invalidMessage form-text">{{errors.first('password')}}</small>
      </div>
        <div v-if="loginFailed" id="loginFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
        Login was not successfull. Try again. 
      </div>
      <div class="text-center">
        <div><button type="submit" class="btn btn-primary">Login</button></div>
        <div><button type="button" @click="onForgotPassword" class="btn btn-primary">Forgot password</button></div>
      </div>
    </form>
  </div>
</div></template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({ components: {} })
export default class LoginView extends Vue {
  name: string = "";
  checked: boolean = false;
  password: string = "";
  bla: any = null;

  loginFailed: boolean = false;

  onSubmit(event: any) {
    event.preventDefault();
    this.$validator.validate().then(result => {
      if (result) {
        // do stuff if valid
        let name = this.name;
        let password = this.password;
        this.$store.dispatch('login', {name, password})
          .then(() => this.$router.push('/'))
          .catch(err => this.loginFailed = true) //todo put into message div 
      } else {
        //Do stuff if not valid e.g. show a message saying that some fields are not correctly filled
      }
    });
  }

  onForgotPassword() {
    this.$router.push('/forgotPassword');
  }
}
</script>


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
