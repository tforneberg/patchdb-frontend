<template>
  <div>
    <tobi-item nachricht="GEILOMAT GEILOMAT GEILOMAT!"/>
    <tobi-item nachricht="HURENSOHN!"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TobiItem from '@/components/TobiItem.vue'; // @ is an alias to /src

@Component({
  components: {
    TobiItem,
  },
})
export default class TobiView extends Vue {}
</script>