<script lang="ts">
import { Component, Vue, Mixins, Prop, Ref, Watch } from 'vue-property-decorator';
import { Patch, User } from '@/model/Model';
import { SortingProp, PatchSortingProps } from '@/model/ui/SortingProp.ts';
import { PagingProps } from '../../model/ui/PagingProps';
import { Constants } from '@/util/Constants';
import PatchComponent from '@/components/PatchComponent.vue';
import SortingComponent from '@/components/general/SortingComponent.vue';

@Component({ components: { PatchComponent, SortingComponent }, })
export default class PatchListView extends Mixins(Constants) {
	@Prop({default: '/api/patches'}) endpointUrl:string;
	@Prop({default: 'Patches'}) title:string;
	@Prop({default: true}) showCollectionButtons:boolean;
	@Prop({default: true}) showSearchBar:boolean;

	@Ref() private sortingComponent : SortingComponent;

	private patches:Patch[] = [];
	private searchString:string = "";

    private pagingProps : PagingProps = new PagingProps();
	private sortingProps : Array<SortingProp> = PatchSortingProps;

    private loadNextButtonVisible:boolean = false;
    private noResults:boolean = false;

	private waitBeforeReloadTimerHandle:number = -1;

	mounted() {
		this.loadPatches(0);
	}

	@Watch('searchString')
    private searchInputChanged(val:string, oldVal:string) : void {
        if (this.waitBeforeReloadTimerHandle != -1) {
            clearTimeout(this.waitBeforeReloadTimerHandle);
        }
        this.waitBeforeReloadTimerHandle = setTimeout(this.loadPatches, 500, 0, this.searchString);
	}

	private loadPatches(newPage:number, searchString:string = null) : void {
		let loadingSpinner = this.$loading.show({container: this.$refs.loadingContainer});
		this.pagingProps.setCurrentPage(newPage);

        if (this.pagingProps.getCurrentPage() == 0) {
            this.patches = [];
		}

		this.axios.get(this.getRequestUrl(searchString)).then(responses => {
			var newPatches = responses.data;
            this.patches.push(...newPatches);
            this.noResults = this.patches.length == 0;
			this.loadNextButtonVisible = newPatches.length == this.pagingProps.getItemsPerPage();
		})
		.catch(err => { /*TODO error message?*/ })
		.finally(() => loadingSpinner.hide());
	}

	private getRequestUrl(searchString:string) : string {
        return this.endpointUrl+this.getSerachString(searchString)+this.pagingProps.getPageAndSizeUrlString()+this.sortingComponent.getSortUrlString();
	}
	
	private getSerachString(searchString:string) : string {
		return searchString == undefined || searchString == null || searchString.length == 0 ? '' : '/name/' + searchString;
	}

}
</script>

<template>
	<div class="text-center">
		<vue-headful :title="TITLE_PREFIX+this.title"/>
		<h1>{{this.title}}</h1>

        <div class="row justify-content-sm-center">
            <div class="col col-12 col-sm-8 col-md-4 col-lg-3 mb-2 mb-md-0 pr-md-1" v-if="showSearchBar">
                <b-form-input id="searchbar" v-model="searchString" class="text-center" type="text" placeholder="Search"/>
            </div>
            
            <SortingComponent :sortingProps="sortingProps" @changed="loadPatches(0, searchString)" class="col col-12 col-sm-8 col-md-4 col-lg-3 pl-md-1" ref="sortingComponent" />
        </div>

		<div ref="loadingContainer"><transition-group name="list" tag="div" class="row justify-content-center">
			<div class="col-12 col-md-6 col-lg-4 col-xl-3 justify-content-center d-flex align-items-center" v-for="(patch, i) in patches" :key="`${i}-${patch.id}`">
					<PatchComponent class="list-item mx-1 my-3" :key="patch.id" :patch="patch" :showCollectionButtons="showCollectionButtons"/>
			</div>
    	</transition-group></div>

		<div class="text-center">
			<transition name="fade">
				<button v-if="loadNextButtonVisible" id="loadNextEntries" @click="loadPatches(pagingProps.getCurrentPage() + 1)" type="submit" class="btn btn-primary">Load next Patches</button>
			</transition>
            <transition name="fade">
				<h2 v-if="noResults" class="mt-4" id="noResultsMessage">No results :-o</h2>
			</transition>
		</div>
	</div>
</template> 

<style lang="scss" scoped>
    .list-enter-active {
        transition: all 0.5s;
    }
    .list-leave-active {
        transition: all 0.5s;
    }
    .list-enter, .list-leave-to {
        opacity: 0;
    }
</style>