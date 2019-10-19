<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';

@Component({components: { }, })
export default class EditProfileView extends Mixins(Constants) { 


 }
</script>


<template>
  <div>
    <vue-headful :title="TITLE_PREFIX+'Registration successful'"/>
    <h1>Registration successful!</h1>
    <p>
        Have a look at your E-Mail account. You should have received a confirmation mail. Please click the link inside the mail to verify your E-Mail address. 
        After this, your registration is completed! 
    </p>
  </div>
</template>


<style lang="scss" scoped>

</style>
