<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';

@Component({
  components: {
    
  },
})
export default class TermsAndConditionsView extends Mixins(Constants) {

}
</script>

<template>
  <div>
    <vue-headful :title="TITLE_PREFIX+'Terms and conditions'"/>
    <h1>Terms and conditions</h1>
  </div>
</template>