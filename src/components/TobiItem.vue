<template>
  <div class="hello">
    <h1>{{ nachricht }}</h1>
    <p>blabla</p>
    <b-alert class="ml-3 mr-3" show>Default Alert</b-alert>
    <h1>{{ nachricht }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TobiItem extends Vue {
  @Prop() private nachricht!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$green: blue;
h1 {
  margin: 80px 0 0;
  color: $green;
}
</style>
