<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AddPatchRequestData } from '@/model/RequestData';

@Component({components: { },})
export default class AddPatchView extends Vue {
  private requestData = new AddPatchRequestData();

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
        
      } else {
        this.showClientSideValidationFaliedMessage = true;
      }
    });
  }

}
</script>

<template><div>
  <div id="addPatchForm">
    <h4>Add Patch</h4>
    <!-- Form elements -->
    <form @submit="onSubmit" novalidate @input="resetFailMessages">
      <div class="form-group" id="nameInputGroup">
        <label for="nameInput">Patch Name:</label>
        <input type="text" class="form-control" :class="{ 'invalid' : showServerSideLoginFailedMessage }" id="nameInput" placeholder="Enter Patch Name" name="name"
          v-model="requestData.name" v-validate="'required'">
          <small v-show="errors.has('name')" class="invalidMessage form-text">{{errors.first('name')}}</small>
      </div>


      <!-- Error alerts -->
      <div v-if="showServerSideLoginFailedMessage" id="serverSideLoginFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
        Patch could not be added.
      </div>
      <div v-if="showClientSideValidationFaliedMessage" id="clientSideFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
        Some fields are not correctly filled.<br>Please correct these errors, first.
      </div>

      <!-- Submit button -->
      <div class="text-center">
        <div><button type="submit" class="btn btn-primary">Submit</button></div>
      </div>

    </form>
  </div>
</div></template>

<style lang="scss" scoped>

#addPatchForm {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

button {
  margin: 6px;
  width: 200px;
}
</style>
