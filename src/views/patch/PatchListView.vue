<script lang="ts">
import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
import { Patch, User } from '@/model/Model';
import { Constants } from '@/util/Constants';
import PatchComponent from '@/components/PatchComponent.vue';

@Component({ components: { PatchComponent }, })
export default class PatchListView extends Mixins(Constants) {
  @Prop({default: 'api/patches'}) endpointUrl:string;

  private patches:Patch[] = [];

  private currentPage:number = 0;
  private size:number = 12;

  private sortLabel = "Datum absteigend";
  private sortProp = "dateInserted";
  private sortDirection = "desc";

  private loadNextButtonVisible:boolean = true;

  created() {
    this.loadPatches();
  }

  private loadPatches() : void {
    this.axios.get(this.endpointUrl+'?page='+this.currentPage+'&size='+this.size+'&sortBy='+this.sortProp+'&direction='+this.sortDirection)
      .then(response => {
        var newPatches = response.data;
        this.patches.push(...newPatches);
        this.currentPage++;
        if (newPatches.length < this.size) {
          this.loadNextButtonVisible = false;
        }
      })
      .catch(err => { //TODO error message?
      });
  }

  private updateSortProp(newSortProp:string, newDirection: string, newSortLabel:string) {
    this.sortProp = newSortProp;
    this.sortDirection = newDirection;
    this.sortLabel = newSortLabel;
    this.currentPage = 0;
    this.patches = [];
    this.loadPatches();  
  }
}
</script>

<template>
  <div class="text-center">
    <vue-headful :title="TITLE_PREFIX+'Latest Patches'"/>
    <h1>Patches</h1>

    <b-dropdown>
      <template slot="button-content">
        Sortiert nach: {{this.sortLabel}}
      </template>
      <b-dropdown-item @click="updateSortProp('dateInserted', 'asc', 'Datum aufsteigend')">Datum aufsteigend</b-dropdown-item>
      <b-dropdown-item @click="updateSortProp('dateInserted', 'desc', 'Datum absteigend')">Datum absteigend</b-dropdown-item>
      <b-dropdown-item @click="updateSortProp('name', 'asc', 'Name aufsteigend')">Name aufsteigend</b-dropdown-item>
      <b-dropdown-item @click="updateSortProp('name', 'desc', 'Name absteigend')">Name absteigend</b-dropdown-item>
    </b-dropdown>

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