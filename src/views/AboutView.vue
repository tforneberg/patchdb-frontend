<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';

@Component({
  components: {
    
  },
})
export default class AboutView extends Mixins(Constants) {

}
</script>

<template>
  <div>
    <vue-headful :title="TITLE_PREFIX+'About '"/>
    <h1>This is an about page</h1>
  </div>
</template>