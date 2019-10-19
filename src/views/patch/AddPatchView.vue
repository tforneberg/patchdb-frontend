<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import {Constants } from '@/util/Constants';
import { Patch, Band } from '@/model/Model';

@Component({components: { },})
export default class AddPatchView extends Mixins(Constants) {
	private patch = new Patch();

	private file : File|null = null;
	private image : any = '';  

	private showClientSideValidationFaliedMessage = false;
	private showServerSideValidationFailedMessage = false;
	private showSuccessMessage = false;
	private isUploading = false;

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

	onFileChange(event : any) : void {
		var files = event.target.files || event.dataTransfer.files;
		if (!files.length) {
			this.image = '';
			this.file = null;
			return;
		}
		this.file = files[0];
		this.createImage(files[0]);
	}

	createImage(file : File) : void {
		var addPatchView = this;
		var fileReader = new FileReader();

		fileReader.onload = ((event : ProgressEvent) => {
			var fileReader:any = event.target;
			if (fileReader != null && fileReader.result != null) {
				addPatchView.image = fileReader.result;
			} else {
				addPatchView.image = '';
			}
		});
		fileReader.readAsDataURL(file);
	}

	onSubmit(event: any) : void {
		event.preventDefault();

		//TODO show "Uploading ... please wait ..." like message or symbol

		//validate form on client
		this.$validator.validate().then(formIsValid => {
			if (formIsValid && this.file != null) {
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
				}); 
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
					<option value="printed">Printed</option>
					<option value="stitched">Stitched</option>
					<option value="woven">Woven</option>
				</select>
			</div>
			
			<!-- Image upload -->
			<div class="form-group" id="fileInputGroup">
				<label for="image">Image:</label>
				<div class="custom-file">
					<input type="file" class="custom-file-input" :class="{ invalid : showServerSideValidationFailedMessage }" 
					id="image" name="image" v-validate="'required|mimes:image/png,image/jpeg'" data-vv-as="image" accept="image/png, image/jpeg" @change="onFileChange">
					<label v-if="file" class="custom-file-label" for="image" :class="{valid : fields.image && fields.image.valid, invalid: errors.has('image')}">{{file.name}}</label>
					<label v-else class="custom-file-label" for="image" :class="{valid : fields.image && fields.image.valid, invalid: errors.has('image')}">Choose file...</label>
					<small v-show="errors.has('image')" class="invalidMessage form-text">{{errors.first('image')}}</small>
				</div>
			</div>

			<!-- Image preview -->
			<div class="container text-center mb-3" v-if="image">
				<img id="imagePreview" :src="image" />
			</div>

			<!-- Error alerts -->
			<div v-if="showServerSideValidationFailedMessage" id="serverSideLoginFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
				Patch could not be added.
			</div>
			<div v-if="showClientSideValidationFaliedMessage" id="clientSideFailedMessage" class="alert alert-danger mx-sm-5 text-center" role="alert">
				Some fields are not correctly filled.<br>Please correct these errors, first.
			</div>

			<!-- Submit button -->
			<div class="text-center">
				<div><button id="submitButton" type="submit" :disabled="isUploading" class="btn btn-primary">Submit</button></div>
			</div>

			<!-- Uploading alert -->
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

#imagePreview {
	width: 100%;
	max-width: 400px;
}
</style>
