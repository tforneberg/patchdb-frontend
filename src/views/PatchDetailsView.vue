<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import { User } from '@/model/User';
import { Getter } from 'vuex-class';

import LightboxForOneImage from '@/components/LightboxForOneImage.vue';

const namespace: string = 'AuthModule' //Vuex module namespace

@Component({components: { LightboxForOneImage }, })
export default class PatchDetailsView extends Vue { 
    @Prop() private id?: string;

    private patch: any = null;

    private showImageBig: boolean = false;

    //Vuex getter binding generated properties
    @Getter('loggedInUser', { namespace }) 
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

    get userIsAdminOrMod() : boolean {
        if (this.loggedInUser != null && this.loggedInUser.role != null) {
            if (this.loggedInUser.role.includes('admin') || this.loggedInUser.role.includes('moderator')) {
                return true;
            }
        }
        return false;
    }

    created() : void {
        this.axios.get('api/patches/'+this.id)
            .then(response => {
                this.patch = response.data;
            })
            .catch(err => console.log(err));
    }

    //TODO static utility method? 
    private getThumbnailPathFromURL(url : string) : string {
        let index : number = url.lastIndexOf('/') + 1;
        return url.slice(0, index) + 's_' + url.slice(index);
    }

    private addToCollection() : void {
        this.$store.dispatch('PatchModule/addPatchToCollection', this.patch.id)
            .then(response => {})
            .catch(error => {});
    }

    private removeFromCollection() : void {
        this.$store.dispatch('PatchModule/removePatchFromCollection', this.patch.id)
            .then(response => {})
            .catch(error => {});
        this.$emit('removeFromCollection');
    }

    private removeFromDatabase() : void {
        //TODO
    }

 }
</script>

<template>
<b-card id="patchCard" >
    <div v-if="patch">
        <h1>{{patch.name}}</h1>
        <div>
            <p>Submitted<span v-if="patch.userInserted"> by <router-link :to="'/user/'+patch.userInserted.id">{{patch.userInserted.name}}</router-link></span> on {{patch.dateInserted}}</p>
            <p>{{patch.description}}</p>
            <a @click="showImageBig = true"><img id="patchDetailImage" :src="getThumbnailPathFromURL(patch.image)"/></a>
            <LightboxForOneImage :show="showImageBig" :imageSrc="this.patch.image" @visibilityChange="showImageBig = $event" />
            <div id="buttonsDiv" v-if="loggedInUser">
                <b-button v-if="userHasPatch" @click="removeFromCollection">Remove from Collection</b-button>
                <b-button v-else @click="addToCollection">Add to Collection</b-button>
                <b-button v-if="userIsAdminOrMod" @click="removeFromDatabase">Remove</b-button>
            </div>
        </div>
    </div>
</b-card>
</template>

<style lang="scss" scoped>
#patchCard {
  background-image: url('../assets/denim500.jpg');
}
#patchDetailImage {
    cursor: pointer;
}
#buttonsDiv {
    margin: 5px;
}
</style>