<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';

@Component({
  components: {
    
  },
})
export default class NotFoundView extends Mixins(Constants) {}
</script>

<template>
  <div class="about text-center">
    <vue-headful :title="TITLE_PREFIX+'404 Not Found '"/>
    <h1>Resource not found (Error 404)</h1>
  </div>
</template>