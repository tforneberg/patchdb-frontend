<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Patch } from '@/model/Patch'
import PatchComponent from '@/components/PatchComponent.vue';
import axios from 'axios';

@Component({ components: { PatchComponent }, })
export default class CollectionView extends Vue { 
  @Prop() private id?: string;

  patches: Patch[] = [];
  username: string = '';

  created() {
    axios.get('api/users/'+this.id).then(response => {
        this.patches = response.data._embedded.patches;
        this.username = response.data.name;
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
    <h1 v-if="username != ''">{{username}}'s collection</h1>
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="patch in patches" v-bind:key="patch.id">
        <PatchComponent class="mx-3 my-3" @removeFromCollection="remove(patch)"  v-bind:patch="patch"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
