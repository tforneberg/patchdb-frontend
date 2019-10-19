<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';

@Component({components: { }, })
export default class EditProfileView extends Mixins(Constants) { 


 }
</script>


<template>
  <div>
    <vue-headful :title="TITLE_PREFIX+'Edit profile'"/>
    <h1>This is an edit profile page</h1>
  </div>
</template>


<style lang="scss" scoped>

</style>
