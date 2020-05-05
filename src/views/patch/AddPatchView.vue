<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { ModelListSelect, ModelSelect } from 'vue-search-select';
import {Constants } from '@/util/Constants';
import { Patch, Band, PatchType } from '@/model/Model';
import UploadImageComponent from '@/components/general/UploadImageComponent.vue';
import AlertComponent from '@/components/general/AlertComponent.vue';
import Util from '@/util/Util';

@Component({components: { AlertComponent, UploadImageComponent, ModelListSelect, ModelSelect }, })
export default class AddPatchView extends Mixins(Constants) {
    private loadingAnimation:any;

	private clientValidationFailed = false;
	private serverValidationFailed = false;
	private showSuccessMessage = false;
	private isUploading = false;
    
    private file : File|null = null;
	private image : any = ''; 

    private bands : Array<Band> = new Array();
    private patch:Patch = new Patch();
    private patchTypes:Object[] = Util.getModelSelectList(Util.getStringValuesFromEnum(PatchType));

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
		this.serverValidationFailed = false;
		this.clientValidationFailed = false;
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
				this.loadingAnimation = this.$loading.show();
				this.isUploading = true;

				let patchDataJson = JSON.stringify(this.patch);
				let patchDataBlob = new Blob([patchDataJson], {type: 'application/json'});

				let formData = new FormData();
				formData.append('patchData', patchDataBlob);
				formData.append('file', this.file);

				this.axios.post('/api/patches', formData).then(response => {
					this.showSuccessMessage = true;
					this.isUploading = false;
					this.patch = new Patch();
					this.image = '';
					this.file = null;
				}).catch(err => {
					this.serverValidationFailed = true;
					this.isUploading = false;
				}).finally(() => { if (this.loadingAnimation) this.loadingAnimation.hide() }); 
			} else {
				this.clientValidationFailed = true;
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
			<div class="form-group" id="formGroup">
				<label for="nameInput">Patch Name:</label>
				<input type="text" class="form-control" id="nameInput" v-model="patch.name" placeholder="Enter Patch Name" name="name"
					 :class="serverValidationFailed ? 'invalid' : ''" v-validate="'required'" />
                <small v-show="errors.has('name')" class="invalidMessage form-text">{{errors.first('name')}}</small>

				<label for="bandInput">Band:</label>
                <model-list-select name="bandSelectionList" :list="bands" option-text="name" option-value="id" v-model="patch.band" placeholder="Enter band"/>

				<label for="typeInput">Type:</label>
                <model-select id="typeInput" name="type" :options="patchTypes" v-model="patch.type" placeholder="Enter type" 
                    :class="serverValidationFailed ? 'invalid' : ''" v-validate="'required'"/>
                <small v-show="errors.has('type')" class="invalidMessage form-text">{{errors.first('type')}}</small>
			</div>

			<UploadImageComponent id="uploadImageComponent" @change="imageFileChanged" previewMaxHeight="600" previewMaxWidth="600" :invalid="serverValidationFailed"/><!-- TODO v-validate...-->

            <AlertComponent :show="serverValidationFailed" id="serverSideValidationFailedMessage" class="mx-sm-5">
                Patch could not be added.
            </AlertComponent>
            <AlertComponent :show="clientValidationFailed" id ="clientSideFailedMessage" class="mx-sm-5">
                Some fields are not correctly filled.<br>Please correct these errors, first.
            </AlertComponent>

			<!-- Submit button -->
			<div class="text-center">
				<div><button id="submitButton" type="submit" :disabled="isUploading" class="btn btn-primary">Submit</button></div>
			</div>

            <AlertComponent :show="isUploading" id="uploadingMessage" class="mx-sm-3">
                Uploading... please wait.
            </AlertComponent>

            <AlertComponent :show="showSuccessMessage" id="successMessage" class="mx-sm-3">
                Patch added! :)
            </AlertComponent>
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
