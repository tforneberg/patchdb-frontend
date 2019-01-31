<template><div>
  <h4>Register</h4>
   <b-form @submit="onSubmit">
      <b-form-group id="emailImputGroup" label="Your Email:" label-for="emailInput">
        <b-form-input id="emailInput" type="email" v-model="email" required placeholder="Enter email" />
      </b-form-group>
      <b-form-group id="nameInputGroup" label="Your Name:" label-for="nameInput">
        <b-form-input id="nameInput" type="text" v-model="name" required placeholder="Enter name" />
      </b-form-group>
      <b-form-group id="pwInputGroup1" label="Your Password:" label-for="pwInput1">
        <b-form-input id="pwInput1" type="password" v-model="password" required placeholder="Enter Password" />
      </b-form-group>
      <b-form-group id="pwInputGroup2" label="Your Password (again):" label-for="pwInput2">
        <b-form-input id="pwInput2" type="password" v-model="password2" required placeholder="Enter Password (again)" />
      </b-form-group>
      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group id="exampleChecks">
          <b-form-checkbox v-model="checked">Check me out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
</div></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    
  },
})
export default class RegisterView extends Vue {
  email: string = "";
  name: string = "";
  checked: boolean = false;
  password: string = "";
  password2: string = "";

  onSubmit (event: any) {
    event.preventDefault();
    let email = this.email;
    let name = this.name;
    let checked = this.checked;
    let password = this.password;
    let password2 = this.password2;

    if (password == password2) {
      alert(JSON.stringify({email, name, password, checked}));
    } else {
      alert("nope passwörter ungleich");
    }
  }

}
</script>
