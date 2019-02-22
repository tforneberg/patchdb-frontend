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
        private patchIDs?: number[];

        get userHasPatch() : boolean {
            if (this.patch && this.patchIDs) {
                return this.patchIDs.includes(this.patch.id);
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
                .catch(error => {})
            }
        }
    }
</script>

<template>
    <div v-if="patch" id="patchComponent">
        <h3><span v-if="patch.band">{{patch.band.name}} - </span>{{patch.name}}</h3>
        <p>Submitted by {{patch.userInserted.name}} on {{patch.dateInserted}}</p>
        <p>{{patch.description}}</p>
        <img :src="patch.image"/>
        <div v-if="loggedInUser">
            <b-button v-if="userHasPatch" @click="removeFromCollection">Remove from Collection</b-button>
            <b-button v-else @click="addToCollection">Add to Collection</b-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
img {
  width: 100%;
  height: auto;
}
</style>