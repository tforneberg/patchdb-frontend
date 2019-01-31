<template>
  <div>
    Latest stuff
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
export default class LatestView extends Vue {}
</script>