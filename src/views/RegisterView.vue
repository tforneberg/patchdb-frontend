<template><div>
  <div id="registerForm">
  <h4>Register</h4>
    <form @submit="onSubmit" novalidate>
      <div class="form-group" id="emailImputGroup">
        <label for="emailInput">Your E-Mail:</label>
        <input type="text" class="form-control" id="emailInput" placeholder="Enter E-Mail" name="email"
          v-model="email" v-validate="'required|email'">
        <small v-show="errors.has('email')" class="invalidMessage form-text">{{errors.first('email')}}</small>
      </div>
      <div class="form-group" id="nameInputGroup">
        <label for="nameInput">Your Name:</label>
        <input type="text" class="form-control" id="nameInput" placeholder="Enter Name" name="name"
          v-model="name" v-validate="'required|min:4|max:20'">
          <small v-show="errors.has('name')" class="invalidMessage form-text">{{errors.first('name')}}</small>
      </div>
      <div class="form-group" id="pwInputGroup">
        <label for="pwInput">Your Password:</label>
        <input type="password" class="form-control" id="pwInput" placeholder="Enter Password" name="password"
          v-model="password" v-validate="{ required: true, min: 6, max: 32 }">
          <small v-show="errors.has('password')" class="invalidMessage form-text">{{errors.first('password')}}</small>
      </div>
      <div class="form-group" id="pwInputGroup2">
        <label for="pwInput2">Your Password:</label>
        <input type="password" class="form-control" id="pwInput2" placeholder="Enter Password (again)" name="password2"
          v-model="password2" v-validate="{ required: true, confirmed: password, min: 6, max: 32 }" data-vv-as="password">
          <small v-show="errors.has('password2')" class="invalidMessage form-text">{{errors.first('password2')}}</small>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="termsCheck" name="termsCheck" 
            v-model="checked" v-validate="'required'" data-vv-as="field">
          <label class="form-check-label" for="termsCheck">
            I agree to the terms and conditions
          </label>
          <small v-show="errors.has('termsCheck')" class="invalidMessage form-text">{{errors.first('termsCheck')}}</small>
        </div>
      </div>
      <div class="text-center">
        <div><button type="submit" class="btn btn-primary">Submit</button></div>
      </div>
    </form>
  </div>
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
  passwordsDontMatch: boolean = false;

  onSubmit (event: any) {
    event.preventDefault();

    this.$validator.validate().then(result => {
      if (result) {
        // do stuff if valid
        let email = this.email;
        let name = this.name;
        let checked = this.checked;
        let password = this.password;
        let password2 = this.password2;
        alert(JSON.stringify({email, name, password, checked}));
      } else {
        //Do stuff if not valid e.g. show a message saying that some fields are not correctly filled
      }
    });
  }
}
</script>

<style lang="scss" scoped>
#registerForm {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

</style>
