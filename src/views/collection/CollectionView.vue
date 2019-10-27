<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';
import { Patch, Collection } from '@/model/Model'
import PatchComponent from '@/components/PatchComponent.vue';

@Component({ components: { PatchComponent }, })
export default class CollectionView extends Mixins(Constants) { 
  @Prop() private id?: string;

  patches: Patch[] = [];
  username: string = '';

  created() {
	this.axios.get('api/users/'+this.id+'/patches').then(response => {
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
	<div class="row">
	  <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="patch in patches" :key="patch.id">
		<PatchComponent class="mx-3 my-3" @removeFromCollection="remove(patch)" :patch="patch"/>
	  </div>
	</div>
  </div>
</template>

<style lang="scss" scoped>

</style>
