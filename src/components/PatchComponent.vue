<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';
    import { User } from '@/model/User';
    import { Patch } from '@/model/Patch';
    const namespace: string = 'AuthModule' //Vuex module namespace

    @Component
    export default class PatchComponent extends Vue {
        @Prop() private patch?: Patch;

        //Vuex getter binding generated properties
        @Getter('loggedInUser', { namespace: 'AuthModule' }) 
        private loggedInUser?: User|null;
        
        @Getter('patchIDs', { namespace: 'PatchModule' })
        private patchIDsOfLoggedInUser?: number[];

        get userHasPatch() : boolean {
            if (this.patch && this.patchIDsOfLoggedInUser) {
                return this.patchIDsOfLoggedInUser.includes(this.patch.id);
            } else {
                return false;
            }
        }

        private addToCollection() : void {
            if (this.patch) {
                this.$store.dispatch('PatchModule/addPatchToCollection', this.patch.id)
                .then(response => {})
                .catch(error => {})
            }
        }

        private removeFromCollection() : void {
            if (this.patch) {
                this.$store.dispatch('PatchModule/removePatchFromCollection', this.patch.id)
                .then(response => {})
                .catch(error => {});
                this.$emit('removeFromCollection');
            }
        }

        //static utiliy method? 
        private getThumbnailPathFromURL(url : string) : string {
            let index : number = url.lastIndexOf('/') + 1;
            return url.slice(0, index) + 's_' + url.slice(index);
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
            <b-button v-if="userHasPatch" @click="removeFromCollection">Remove from Collection</b-button>
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