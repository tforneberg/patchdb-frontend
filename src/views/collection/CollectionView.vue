<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';
import { Patch, Collection } from '@/model/Model'
import PatchComponent from '@/components/PatchComponent.vue';

//TODO remove component, use PatchListView and customize with props instead? 

@Component({ components: { PatchComponent }, })
export default class CollectionView extends Mixins(Constants) { 
  @Prop() private id?: string;

  patches: Patch[] = [];
  username: string = '';

  created() {
	this.axios.get('/api/users/'+this.id+'/patches').then(response => {
	  let collection:Collection = response.data as Collection;
	  this.patches = collection.patches;
	  this.username = collection.username;
	})
  }

  remove(patch : Patch) {
	let index = this.patches.indexOf(patch);
	this.patches.splice(index, 1);
  }

 }
</script>

<template>
  <div>
	<vue-headful :title="TITLE_PREFIX + (username ? username + '\'s' : '') + ' Collection'"/>
	<h1 v-if="username != ''">{{username}}'s collection</h1>
	<transition-group name="list" tag="div" class="row justify-content-center">
	  <div class="col-12 col-md-6 col-lg-4 col-xl-3 list-item" v-for="patch in patches" :key="patch.id">
		<PatchComponent class="mx-3 my-3" @removeFromCollection="remove(patch)" :patch="patch" :key="patch.id" />
	  </div>
	</transition-group>
  </div>
</template>

<style lang="scss" scoped>
    .list-item {
        transition: all 0.5s;
    }
    .list-enter-active, .list-leave-active {
        transition: all 0.5s;
    }
    .list-leave-active {
        position: absolute;
    }
    .list-enter, .list-leave-to {
        opacity: 0;
    }
</style>
