<script lang="ts">
    import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
    import { getModule } from 'vuex-module-decorators';
    import PatchModule from '@/store/modules/PatchModule';
    import { UserUtil } from '@/util/UserUtil';
    import { ImageUtil } from '@/util/ImageUtil';
    import { User, Patch } from '@/model/Model';

    @Component
    export default class PatchComponent extends Mixins(UserUtil, ImageUtil) {
        @Prop() private patch?: Patch;

        private addToCollection() : void {
            if (this.patch) {
                getModule(PatchModule).addPatchToCollection(this.patch.id)
                .then(response => {})
                .catch(error => {});
            }
        }

        private removeFromCollection() : void {
            if (this.patch) {
                getModule(PatchModule).removePatchFromCollection(this.patch.id)
                .then(response => {
                    this.$emit('removeFromCollection');
                })
                .catch(error => {});
            }
        }
    }
</script>

<template>
<b-card id="patchCard" >
    <div v-if="patch" id="patchComponent">
        <h3><span v-if="patch.band">{{patch.band.name}} - </span><router-link :to="'/patch/'+patch.id">{{patch.name}}</router-link></h3>
        <p>Submitted<span v-if="patch.userInserted"> by <router-link :to="'/user/'+patch.userInserted.id">{{patch.userInserted.name}}</router-link></span> on {{patch.dateInserted}}</p>
        <p>{{patch.description}}</p>
        <router-link :to="'/patch/'+patch.id">
            <img :src="getThumbnailPathFromURL(patch.image)"/>
        </router-link>
        <div id="buttonsDiv" v-if="loggedInUser">
            <b-button v-if="loggedInUserHasPatch(this.patch)" @click="removeFromCollection">Remove from Collection</b-button>
            <b-button v-else @click="addToCollection">Add to Collection</b-button>
        </div>
    </div>
</b-card>
</template>

<style scoped lang="scss">
#patchCard {
  background-image: url('../assets/denim500.jpg');
}
img {
  width: 100%;
  height: auto;
  margin-bottom: 5px;
  border: 2px solid black;
//   border: 5px solid transparent;
//   border-image: url('../assets/border.png') 30 round;

}

#buttonsDiv {
    text-align:center;
}
</style>