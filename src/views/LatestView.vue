<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Patch } from '@/model/Patch'
import { User } from '@/model/User'
import PatchComponent from '@/components/PatchComponent.vue';
import axios from 'axios';

@Component({ components: { PatchComponent }, })
export default class LatestView extends Vue {
  patches: Patch[] = [];

  created() {
    axios.get('api/patches')
      .then(response => {
        this.patches = response.data._embedded.patches;
      })
      .catch(err => {
      });
  }
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="patch in patches" v-bind:key="patch.id">
        <b-card class="mx-3 my-3"><PatchComponent v-bind:patch="patch"/></b-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
