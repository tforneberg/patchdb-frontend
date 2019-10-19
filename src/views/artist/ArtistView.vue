<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Band } from '@/model/Model';
import { Constants } from '@/util/Constants';

@Component({components: { }, })
export default class ArtistView extends Mixins(Constants) { 
  artist : Band


 }
</script>


<template>
  <div><vue-headful :title="TITLE_PREFIX + 'Artist ' + (artist ? artist.name : '')"/>
    <h1>This is an artist page</h1>
  </div>
</template>


<style lang="scss" scoped>

</style>
