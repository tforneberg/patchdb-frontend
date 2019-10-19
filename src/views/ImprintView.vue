<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';

@Component({
  components: {
    
  },
})
export default class ImprintView extends Mixins(Constants) {

}
</script>

<template>
  <div>
    <vue-headful :title="TITLE_PREFIX+'Imprint'"/>
    <h1>Imprint</h1>
  </div>
</template>