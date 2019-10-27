<script lang="ts">
    import { Component, Prop, Vue, Mixins } from 'vue-property-decorator'; 

    @Component
    export default class UploadImageComponent extends Vue {
        @Prop({default: false}) private invalid:boolean;
        @Prop({default: 400}) private previewMaxHeight:number;
        @Prop({default: 400}) private previewMaxWidth:number;

        private fileReader:FileReader = new FileReader();

        private file:File = null;
        private image:any = ''; //TODO check data type? always string

        get imagePreviewStyle() : string {
            return 'max-width: '+this.previewMaxWidth+'px; max-height: '+this.previewMaxHeight+'px';
        }

        created() {
            this.fileReader.onload = ((event : ProgressEvent) => {
                var target:any = event.target;
                if (target != null && target.result != null) {
                    this.image = target.result;
                } else {
                    this.image = '';
                }
            });
        }

        onFileChange(event : any) : void {
            var files = event.target.files || event.dataTransfer.files;
            if (!files.length) {
                this.file = null;
                this.image = '';
            } else {
                this.file = files[0];
                this.updatePreviewImageWithFile(files[0]);
            }
            this.$emit('change', this.file);
        }

        updatePreviewImageWithFile(file : File) : void {
            this.fileReader.readAsDataURL(file);
        }

    }
</script>

<template>
    <div>
        <div class="form-group" id="fileInputGroup">
            <label for="image">Image:</label>
            <div class="custom-file">
                <input type="file" class="custom-file-input" :class="{ invalid : invalid }" 
                id="image" name="image" v-validate="'required|mimes:image/png,image/jpeg'" data-vv-as="image" accept="image/png, image/jpeg" @change="onFileChange">
                <label v-if="file" class="custom-file-label" for="image" :class="{valid : fields.image && fields.image.valid, invalid: errors.has('image')}">{{file.name}}</label>
                <label v-else class="custom-file-label" for="image" :class="{valid : fields.image && fields.image.valid, invalid: errors.has('image')}">Choose file...</label>
                <small v-show="errors.has('image')" class="invalidMessage form-text">{{errors.first('image')}}</small>
            </div>
        </div>

        <!-- Image preview -->
        <div class="container text-center mb-3" v-if="image">
            <img id="imagePreview" :style="imagePreviewStyle" :src="image" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>