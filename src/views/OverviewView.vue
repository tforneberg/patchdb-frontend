<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';

@Component({components: { }, })
export default class OverviewView extends Mixins(Constants) { 


 }
</script>


<template>
  <div>
    <vue-headful :title="TITLE_PREFIX+'Overview'"/>
    <h1>This is an overview page</h1>
  </div>
</template>


<style lang="scss" scoped>

</style>
