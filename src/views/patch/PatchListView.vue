<script lang="ts">
import { Component, Vue, Mixins, Prop, Ref } from 'vue-property-decorator';
import { Patch, User } from '@/model/Model';
import { SortingProp, PatchSortingProps } from '@/model/ui/SortingProp.ts';
import { Constants } from '@/util/Constants';
import PatchComponent from '@/components/PatchComponent.vue';
import SortingComponent from '@/components/general/SortingComponent.vue';

@Component({ components: { PatchComponent, SortingComponent }, })
export default class PatchListView extends Mixins(Constants) {
  @Prop({default: 'api/patches'}) endpointUrl:string;
  @Prop({default: 'Patches'}) title:string;

  private patches:Patch[] = [];

  private currentPage:number = 0;
  private size:number = 12;

  private sortingProps : Array<SortingProp> = PatchSortingProps;
  @Ref() private sortingComponent : SortingComponent;

  private loadNextButtonVisible:boolean = true;

  mounted() {
    this.loadPatches();
  }

  private loadPatches() : void {
    let loader = this.$loading.show({container: this.$refs.loadingContainer});
    this.axios.get(this.endpointUrl+this.getPageAndSizeUrlString()+this.sortingComponent.getSortUrlString())
      .then(response => {
        var newPatches = response.data;
        this.patches.push(...newPatches);
        this.currentPage++;
        if (newPatches.length < this.size) {
          this.loadNextButtonVisible = false;
        }
      })
      .catch(err => { /*TODO error message?*/ })
      .finally(() => loader.hide());
  }

  private getPageAndSizeUrlString() : string {
    return '?page='+this.currentPage+'&size='+this.size; //TODO move to own component ... 
  }

  private sortingChanged() {
    this.currentPage = 0;
    this.patches = [];
    this.loadPatches();  
  }
}
</script>

<template>
  <div class="text-center">
    <vue-headful :title="TITLE_PREFIX+this.title"/>
    <h1>{{this.title}}</h1>
    <SortingComponent :sortingProps="sortingProps" @changed="sortingChanged()" ref="sortingComponent" />

    <div class="row" ref="loadingContainer">
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