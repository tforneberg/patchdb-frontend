<script lang="ts">
import { Component, Vue, Mixins, Prop, Ref, Watch } from 'vue-property-decorator';
import { Patch, User } from '@/model/Model';
import { SortingProp, PatchSortingProps } from '@/model/ui/SortingProp.ts';
import { Constants } from '@/util/Constants';
import PatchComponent from '@/components/PatchComponent.vue';
import SortingComponent from '@/components/general/SortingComponent.vue';

@Component({ components: { PatchComponent, SortingComponent }, })
export default class SearchPatchesView extends Mixins(Constants) {
  @Prop({default: 'api/patches/findByName/'}) endpointUrl:string;
  @Prop({default: 'Search Patches'}) title:string;

  private patches:Patch[] = [];

  private searchString:string = "";

  private currentPage:number = 0;
  private size:number = 12;

  private sortingProps : Array<SortingProp> = PatchSortingProps;
  @Ref() private sortingComponent : SortingComponent;

  private loadNextButtonVisible:boolean = true;

  mounted() {
	this.loadPatches(0);
  }

  private loadPatches(newPage:number) : void {
	this.currentPage = newPage;
	this.axios.get(this.endpointUrl+this.searchString+this.getPageAndSizeUrlString()+this.sortingComponent.getSortUrlString())
	  .then(response => {
		var newPatches = response.data;
		this.patches.push(...newPatches);
		if (newPatches.length < this.size) {
		  this.loadNextButtonVisible = false;
		}
	  })
	  .catch(err => { //TODO error message?
	  });
  }

  @Watch('searchString')
  private searchInputChanged(val:string, oldVal:string) : void {
	  this.patches = [];
	  if (val != null && val.length > 0) {
		this.loadPatches(0);
	  }
  }

  private getPageAndSizeUrlString() : string {
	return '?page='+this.currentPage+'&size='+this.size; //TODO move to own component ... 
  }

  private sortingChanged() {
	this.patches = [];
	this.loadPatches(0);  
  }
}
</script>

<template>
  <div class="text-center">
	<vue-headful :title="TITLE_PREFIX+this.title"/>
	<h1>{{this.title}}</h1>

	<b-form-input id="searchbar" v-model="searchString" size="sm" class="my-2 mr-2 ml-lg-3 mr-lg-2 mx-lg-2" type="text" placeholder="Search"/>

	<SortingComponent :sortingProps="sortingProps" @changed="sortingChanged()" ref="sortingComponent" />

	<div class="row">
	  <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="(patch, i) in patches" :key="`${i}-${patch.id}`">
		<PatchComponent class="mx-3 my-3" :patch="patch"/>
	  </div>
	</div>
	<div class="text-center">
	  <button v-if="loadNextButtonVisible" id="loadNextEntries" @click="loadPatches(++currentPage)" type="submit" class="btn btn-primary">Load next Patches</button>
	</div>
  </div>
</template> 

<style lang="scss" scoped>

</style>