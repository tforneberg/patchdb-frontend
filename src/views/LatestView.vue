<template>
  <div>
    {{response.response.data}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({ components: { }, })
export default class LatestView extends Vue {
  response: string = "";

  created() {
    axios({url: '', method: 'GET' })
      .then(response => {
        this.response = JSON.stringify(response.data, null, "\t");
      })
      .catch(err => {
        this.response = err;
      });
  }
}
</script>