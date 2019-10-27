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

    @Ref() private sortingComponent : SortingComponent;

    private patches:Patch[] = [];

    private searchString:string = "";

    private currentPage:number = 0;
    private size:number = 12;

    private sortingProps : Array<SortingProp> = PatchSortingProps;

    private loadNextButtonVisible:boolean = false;

    private waitBeforeReloadTimerID:number = -1;

    mounted() {
        this.loadPatches(0);
    }

    @Watch('searchString')
    private searchInputChanged(val:string, oldVal:string) : void {
        if (this.waitBeforeReloadTimerID != -1) {
            clearTimeout(this.waitBeforeReloadTimerID);
        }
        this.waitBeforeReloadTimerID = setTimeout(this.updateSearchResults, 500);
    }

    private updateSearchResults() : void {
        if (this.searchString != null && this.searchString.length > 0) {
            this.loadPatches(0);
        } else {
            this.patches = [];
            this.loadNextButtonVisible = false;
        }
    }

    private getPageAndSizeUrlString() : string {
        return '?page='+this.currentPage+'&size='+this.size; //TODO move to own component ...
    }

    private loadPatches(newPage:number) : void {
        this.currentPage = newPage;
        let timeout:number = 0;
        if (newPage == 0 && this.patches.length > 0) {
            this.patches = [];
            timeout = 500;
        }
        let timeoutPromise = new Promise((resolve, reject) => { setTimeout(resolve, timeout)});
        let requestPromise = this.axios.get(this.endpointUrl+this.searchString+this.getPageAndSizeUrlString()+this.sortingComponent.getSortUrlString());
        Promise.all([requestPromise, timeoutPromise])
            .then(responses => {
                let newPatches = responses[0].data;
                this.patches.push(...newPatches);
                this.loadNextButtonVisible = newPatches.length == this.size;
            }).catch(err => { /*TODO error message? */});
    }

    private sortingChanged() {
        this.loadPatches(0);
    }
}
</script>

<template>
<div class="text-center">
    <vue-headful :title="TITLE_PREFIX+this.title"/>
    <h1>{{this.title}}</h1>

    <div class="text-center">
    <b-form-input id="searchbar" v-model="searchString" size="sm" class="my-2 mx-auto col-md-6" type="text" placeholder="Search"/>
    </div>

    <transition name="fade">
        <SortingComponent v-show="patches.length > 1" :sortingProps="sortingProps" @changed="sortingChanged()" ref="sortingComponent" />
    </transition>

    <transition-group name="list" tag="div" class="row justify-content-center">
        <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="(patch, i) in patches" :key="`${i}-${patch.id}`">
                <PatchComponent class="list-item mx-3 my-3" :key="patch.id" :patch="patch"/>
        </div>
    </transition-group>

    <div class="text-center">
        <transition name="fade">
            <button v-if="loadNextButtonVisible" id="loadNextEntries" @click="loadPatches(++currentPage)" type="submit" class="btn btn-primary">Load next Patches</button>
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