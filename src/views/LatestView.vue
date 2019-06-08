<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Patch } from '@/model/Patch'
import { User } from '@/model/User'
import PatchComponent from '@/components/PatchComponent.vue';
import axios from 'axios';

@Component({ components: { PatchComponent }, })
export default class LatestView extends Vue {
  private patches:Patch[] = [];
  private currentPage:number = 0;
  private size:number = 12;
  private sortString:string = 'dateInserted,desc';

  private loadNextButtonVisible:boolean = true;

  created() {
    this.loadPatches();
  }

  private loadPatches() : void {
    axios.get('api/patches?page='+this.currentPage+'&size='+this.size+'&sort='+this.sortString)
      .then(response => {
        var newPatches = response.data._embedded.patches;
        this.patches.push(...newPatches);
        this.currentPage++;
        if (newPatches.length < this.size) {
          this.loadNextButtonVisible = false;
        }
      })
      .catch(err => { //TODO error message?
      });
  }
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="patch in patches" v-bind:key="patch.id">
        <PatchComponent class="mx-3 my-3" v-bind:patch="patch"/>
      </div>
    </div>
    <div class="text-center">
      <button v-if="loadNextButtonVisible" id="loadNextEntries" @click="loadPatches()" type="submit" class="btn btn-primary">Load next Patches</button>
    </div>
  </div>
</template> 

<style lang="scss" scoped>


</style>
