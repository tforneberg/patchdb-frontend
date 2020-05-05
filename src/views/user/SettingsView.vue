<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';
import { UserUtil } from '@/util/UserUtil';
import { User, ChangePasswordRequestData } from '@/model/Model';
import UploadImageComponent from '@/components/general/UploadImageComponent.vue';
import AlertComponent from '@/components/general/AlertComponent.vue';

@Component({components: { UploadImageComponent, AlertComponent }, })
export default class SettingsView extends Mixins(UserUtil, Constants) { 
    private requestData = new ChangePasswordRequestData();

    private showClientSidePasswordChangeFaliedMessage:boolean = false;
    private showServerSidePasswordChangeErrorMessage:boolean = false;
    private showSavePasswordSuccessMessage:boolean = false;

    private showImageUploadFailMessage:boolean = false;
    private showImageUploadSuccessMessage:boolean = false;
    private imageFile:File;

    private user:User = new User();

    created() : void {
        this.axios.get('/api/users/'+this.loggedInUser.id)
            .then(response => {
                this.user = response.data;
            })
            .catch(err => console.log(err));
    }

    private resetPasswordFailOrSuccessMessages() : void {
        this.showSavePasswordSuccessMessage = false;
        this.showServerSidePasswordChangeErrorMessage = false;
        this.showClientSidePasswordChangeFaliedMessage = false;
    }

    private resetImageUploadFailOrSuccessMessages() : void {
        this.showImageUploadFailMessage = false;
        this.showImageUploadSuccessMessage = false;
    }

    private imageFileChanged(newFile:File) : void {
        this.resetImageUploadFailOrSuccessMessages();
		this.imageFile = newFile;
	}

    private onChangePassword (event: any) : void {
        event.preventDefault();

        //validate form on client
        this.$validator.validate().then(formIsValid => {
            if (formIsValid && this.loggedInUser) {
                let loader = this.$loading.show({container: this.$refs.savePasswordButton});
                this.axios.patch('/api/users/'+this.loggedInUser.id+'/changePassword', this.requestData)
                    .then(response => {
                        this.showSavePasswordSuccessMessage = true;
                    })
                    .catch(err => {
                        console.log(err);
                        this.showServerSidePasswordChangeErrorMessage = true
                    })
                    .finally(() => loader.hide());
            } else {
                this.showClientSidePasswordChangeFaliedMessage = true;
            }
        });
    }

    private onSubmitImageUpload(event : any) : void {
        if (this.loggedInUser) {
            let loader = this.$loading.show({container:this.$refs.uploadImageButton});
            var requestObject:FormData = new FormData();
            requestObject.append('file', this.imageFile);

            this.axios.post('/api/users/'+this.loggedInUser.id+'/uploadImage', requestObject, 
                    { headers: {'Content-Type': 'multipart/form-data'} }
                ).then(response => {
                    this.showImageUploadSuccessMessage = true;
                    //TODO reset image upload component ... ? 
                })
                .catch (err => {
                    console.log(err);
                    this.showImageUploadFailMessage = true;
                }).finally(() => loader.hide());
        } else {
            this.showImageUploadFailMessage = true;
        }
    }
}
</script>

<template>
    <div>
        <vue-headful :title="TITLE_PREFIX+'User Settings'"/>
        <h1>Settings</h1>
        <h4>Change password</h4> <!-- TODO make component from this form --> 
        <form @submit="onChangePassword" novalidate @input="resetPasswordFailOrSuccessMessages" class="mb-3">
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
            <alert-component :show="showServerSidePasswordChangeErrorMessage" class="mx-3 col-md-4 col-sm-6" error="true">Changing the password was not successful.</alert-component>
            <alert-component :show="showClientSidePasswordChangeFaliedMessage" class="mx-3 col-md-4 col-sm-6" error="true">Some fields are not correctly filled.<br>Please correct these errors, first.</alert-component>
            <alert-component :show="showSavePasswordSuccessMessage" class="mx-3 col-md-4 col-sm-6">New password saved!</alert-component>
            <div class="col-md-4 col-sm-6">
                <div><button type="submit" ref="savePasswordButton" class="btn btn-primary vld-parent">Save</button></div>
            </div>
        </form>

        <h4>Upload Image</h4>
        <label class="col-12">Old Image:</label>
        <img :src="user.image" class="col-md-4 col-sm-6 mb-5"/>
        <upload-image-component id="uploadImageComponent" label="New image:" class="form-group col-md-4 col-sm-6" @change="imageFileChanged" :invalid="showImageUploadFailMessage"/><!-- TODO v-validate...-->
        <alert-component :show="showImageUploadFailMessage" class="mx-3 col-md-4 col-sm-6" error="true" >Image could not be uploaded!</alert-component>
        <alert-component :show="showImageUploadSuccessMessage" class="mx-3 col-md-4 col-sm-6">Image upload was successful!</alert-component>
        <div class="col-md-4 col-sm-6">
            <div><button type="submit" ref="uploadImageButton" class="btn btn-primary vld-parent" @click="onSubmitImageUpload">Save</button></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>
