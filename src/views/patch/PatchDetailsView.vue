<script lang="ts">

import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import PatchModule from '@/store/modules/PatchModule';
import { User, Patch, PatchState } from '@/model/Model';
import { UserUtil } from '@/util/UserUtil';
import { ImageUtil } from '@/util/ImageUtil';
import { Constants } from '@/util/Constants';

import LightboxForOneImage from '@/components/LightboxForOneImage.vue';

@Component({components: { LightboxForOneImage }, })
export default class PatchDetailsView extends Mixins(UserUtil, ImageUtil, Constants) {
    private patch: Patch = new Patch();
    private showImageBig: boolean = false;

    @Prop() private id: string;

    created() : void {
        this.axios.get('api/patches/'+this.id)
            .then(response => {
                this.patch = response.data as Patch;
            })
            .catch(error => console.log(error));
    }

    private isNotApproved() : boolean {
        return this.patch.state == PatchState.notApproved;
    }

    private addToCollection() : void {
        getModule(PatchModule).addPatchToCollection(this.patch.id)
            .then(response => {})
            .catch(error => {console.log(error)});
    }

    private removeFromCollection() : void {
        getModule(PatchModule).removePatchFromCollection(this.patch.id)
            .then(response => {
                this.$emit('removeFromCollection');
            })
            .catch(error => {console.log(error)});
        
    }

    private approve() : void {
        let requestObj:Patch = new Patch();
        requestObj.state = PatchState.approved;
        this.axios.patch('api/patches/'+this.id, requestObj)
            .then(response => {
                this.patch = response.data as Patch;
            })
            .catch(error => console.log(error));
    }

    private removeFromDatabase() : void {
        //TODO
        this.axios.delete('api/patches/'+this.id)
            .then(response => {
                this.$router.go(-1);
            })
            .catch(error => console.log(error));
    }

 }
</script>

<template>
<b-card id="patchCard" >
    <vue-headful :title="TITLE_PREFIX+'Patch: ' + patch.name ?  patch.name : ''"/>
    <div v-if="patch">
        <h1>{{patch.name}}</h1>
        <div>
            <p>Submitted<span v-if="patch.userInserted"> by <router-link :to="'/user/'+patch.userInserted.id">{{patch.userInserted.name}}</router-link></span> on {{patch.dateInserted}}</p>
            <p>{{patch.description}}</p>
            <a @click="showImageBig = true"><img id="patchDetailImage" :src="getThumbnailPathFromURL(patch.image)"/></a>
            <LightboxForOneImage :show="showImageBig" :imageSrc="patch.image" @visibilityChange="showImageBig = $event" />
            <div id="buttonsDiv" v-if="loggedInUser">
                <transition name="fade" mode="out-in">
                    <b-button key="1" v-if="loggedInUserHasPatch(patch)" @click="removeFromCollection()">Remove from Collection</b-button>
                    <b-button key="2" v-else @click="addToCollection()">Add to Collection</b-button>
                </transition>
                <b-button v-if="userIsAdminOrMod()" @click="removeFromDatabase()">Delete</b-button>
                <b-button v-if="userIsAdminOrMod() && isNotApproved()" @click="approve()">Approve</b-button> 
            </div>
        </div>
    </div>
</b-card>
</template>

<style lang="scss" scoped>
#patchCard {
  background-image: url('../../assets/denim500.jpg');
}
#patchDetailImage {
    cursor: pointer;
}
#buttonsDiv {
    margin: 5px;
}
</style>