<template><div>
  <h4>Login</h4>
   <b-form @submit="onSubmit">
      <b-form-group id="nameInputGroup" label="Your Name:" label-for="nameInput">
        <b-form-input id="nameInput" type="text" v-model="name" required placeholder="Enter name" />
      </b-form-group>
      <b-form-group id="pwInputGroup1" label="Your Password:" label-for="pwInput1">
        <b-form-input id="pwInput1" type="password" v-model="password" required placeholder="Enter Password" />
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button @click="onForgotPassword" variant="primary">Forgot password</b-button>
    </b-form>
</div></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    
  },
})
export default class LoginView extends Vue {
  name: string = "";
  checked: boolean = false;
  password: string = "";

  onSubmit(event: any) {
    event.preventDefault();
    let name = this.name;
    let password = this.password;

    this.$store.dispatch('login', {name, password})
      .then(() => this.$router.push('/'))
      .catch(err => console.log(err))
  }

  onForgotPassword() {
    this.$router.push('/forgotPassword');
  }
}
</script>
