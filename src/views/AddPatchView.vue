<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AddPatchRequestData } from '@/model/RequestData';

@Component({components: { },})
export default class AddPatchView extends Vue {
  private requestData = new AddPatchRequestData();

  private file : File|null = null;
  private image : any = '';  

  private showClientSideValidationFaliedMessage = false;
  private showServerSideLoginFailedMessage = false;

  resetFailMessages() : void {
    this.showServerSideLoginFailedMessage = false;
    this.showClientSideValidationFaliedMessage = false;
  }

  onFileChange(event : any) {
    var files = event.target.files || event.dataTransfer.files;
    if (!files.length) {
      this.image = '';
      this.file = new File([],'');
      return;
    }
    this.file = files[0];
    this.createImage(files[0]);
  }

  createImage(file : File) {
    var instance = this;
    var reader = new FileReader();

    reader.onload = ((e : FileReaderProgressEvent) => {
      e.target != null ? instance.image = e.target.result : '';
    });
    reader.readAsDataURL(file);
  }

  onSubmit(event: any) : void {
    event.preventDefault();

    //validate form on client
    this.$validator.validate().then(formIsValid => {
      if (formIsValid && this.file != null) {
        // let json = JSON.stringify(this.requestData);
        let json = JSON.stringify(this.requestData.name);
        let blob = new Blob([json], {type: 'application/json'});

        let formData = new FormData();
        formData.append('name', blob);
        formData.append('file', this.file);

        this.axios.post('api/patches/', formData).then(response => console.log(response)).catch(err => console.log(err)); 
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
      
      <!-- Image upload -->
      <div class="form-group" id="fileInputGroup">
        <label for="image">Image:</label>
        <div class="custom-file">
          <input type="file" class="custom-file-input" :class="{ 'invalid' : showServerSideLoginFailedMessage }" 
          id="image" name="image" v-validate="'mimes:image/png,image/jpeg'" data-vv-as="image" accept="image/png, image/jpeg" @change="onFileChange">
          <label v-if="file" class="custom-file-label" for="validatedCustomFile">{{file.name}}</label>
          <label v-else class="custom-file-label" for="validatedCustomFile">Choose file...</label>
          <small v-show="errors.has('fileInput')" class="invalidMessage form-text">{{errors.first('fileInput')}}</small>
        </div>
      </div>

      <!-- Image preview -->
      <div class="container text-center mb-3" v-if="image">
        <img id="imagePreview" :src="image" />
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

#imagePreview {
  width: 100%;
  max-width: 400px;
}
</style>
