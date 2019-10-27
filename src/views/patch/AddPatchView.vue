<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import {Constants } from '@/util/Constants';
import { Patch, Band, PatchType } from '@/model/Model';
import UploadImageComponent from '@/components/general/UploadImageComponent.vue';
import Util from '@/util/Util';

@Component({components: { UploadImageComponent }, })
export default class AddPatchView extends Mixins(Constants) {
    private patch = new Patch();
    private patchTypeValues:string[] = Util.getStringValuesFromEnum<PatchType>(PatchType);

	private file : File|null = null;
	private image : any = '';  

	private showClientSideValidationFaliedMessage = false;
	private showServerSideValidationFailedMessage = false;
	private showSuccessMessage = false;
	private isUploading = false;
	private loader:any;

	private bands : Array<Band> = new Array();

	created() {
		this.loadBands();
	}

	loadBands() : void {
		this.axios.get('api/bands')
			.then(response => {
				this.bands.push(...response.data);
			})
			.catch(err => { console.log(err); });
	}

	hideSuccessOrFailMessages() : void {
		this.showServerSideValidationFailedMessage = false;
		this.showClientSideValidationFaliedMessage = false;
		this.showSuccessMessage = false;
	}

	imageFileChanged(newFile:File) : void {
		this.file = newFile;
	}

	onSubmit(event: any) : void {
		event.preventDefault();

		//validate form on client
		this.$validator.validate().then(formIsValid => {
			if (formIsValid && this.file != null) {
				this.loader = this.$loading.show();
				this.isUploading = true;

				let patchDataJson = JSON.stringify(this.patch);
				let patchDataBlob = new Blob([patchDataJson], {type: 'application/json'});

				let formData = new FormData();
				formData.append('patchData', patchDataBlob);
				formData.append('file', this.file);

				this.axios.post('api/patches', formData).then(response => {
					this.showSuccessMessage = true;
					this.isUploading = false;
					this.patch = new Patch();
					this.image = '';
					this.file = null;
				}).catch(err => {
					this.showServerSideValidationFailedMessage = true;
					this.isUploading = false;
				}).finally(() => { if (this.loader) this.loader.hide() }); 
			} else {
				this.showClientSideValidationFaliedMessage = true;
			}
		});
	}

}
</script>

<template><div>
	<vue-headful :title="TITLE_PREFIX+'Add Patch: '+(patch.name ? patch.name : '')"/>
	<div id="addPatchForm">
		<h4>Add Patch</h4>
		<!-- Form elements -->
		<form @submit="onSubmit" novalidate @input="hideSuccessOrFailMessages">
			<div class="form-group" id="nameInputGroup">
				<label for="nameInput">Patch Name:</label>
				<input type="text" class="form-control" :class="{ 'invalid' : showServerSideValidationFailedMessage }" id="nameInput" placeholder="Enter Patch Name" name="name"
					v-model="patch.name" v-validate="'required'">
					<small v-show="errors.has('name')" class="invalidMessage form-text">{{errors.first('name')}}</small>

				<label for="bandInput">Band:</label>
				<select name="bandInput" id="bandInput" class="form-control" placeholder="Enter band" v-model="patch.band">
					<option value="">- None -</option>
					<option v-for="band in bands" :key="band.id" :value="band">{{band.name}}</option>
				</select>

				<label for="typeInput">Type:</label>
				<select name="typeInput" id="typeInput" class="form-control" placeholder="Enter type" v-model="patch.type">
                    <option v-for="item in patchTypeValues" :key="item" :value="item">{{item}}</option>
				</select>
			</div>

			<upload-image-component id="uploadImageComponent" @change="imageFileChanged" previewMaxHeight="600" previewMaxWidth="600" :invalid="showServerSideValidationFailedMessage"/><!-- TODO v-validate...-->

			<!-- Error alerts --> <!-- TODO make components from these -->
			<div v-if="showServerSideValidationFailedMessage" id="serverSideValidationFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
				Patch could not be added.
			</div>
			<div v-if="showClientSideValidationFaliedMessage" id="clientSideFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
				Some fields are not correctly filled.<br>Please correct these errors, first.
			</div>

			<!-- Submit button -->
			<div class="text-center">
				<div><button id="submitButton" type="submit" :disabled="isUploading" class="btn btn-primary">Submit</button></div>
			</div>

			<!-- Uploading alert --> <!-- TODO make components from these -->
			<div v-if="isUploading" id="uploadingMessage" class="alert alert-info mx-sm-3 text-center" role="alert">
				Uploading... please wait.
			</div>

			<!-- Success alert -->
			<div v-if="showSuccessMessage" id="successMessage" class="alert alert-success mx-sm-3 text-center" role="alert">
				Patch added!
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

#submitButton {
	margin: 6px;
	margin-bottom: 12px;
	width: 200px;
}
</style>
