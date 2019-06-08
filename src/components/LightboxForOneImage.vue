<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';

    //@ts-ignore
    import LightBox from 'vue-image-lightbox';

    @Component({components: { LightBox }, })
    export default class LightboxForOneImage extends Vue {
        @Prop() private show?:boolean;
        @Prop() private showThumbnails?:boolean;
        @Prop() private imageSrc?:String;

        private imageDataForLightBox?:Array<any>;

        get imagesDataForLightBox() : Array<any> {
            return [{thumb:'', src: this.imageSrc}];
        }

        private onOpened(isVisibleNow:boolean) : void {
            this.$emit('visibilityChange', isVisibleNow);
        }
    }
</script>

<template>
    <LightBox v-if="show" :showThumbs="false" :images="imagesDataForLightBox" @onOpened="onOpened($event)"/>
</template>

<style scoped lang="scss"> 
</style>