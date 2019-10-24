<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';
import { UserUtil } from '@/util/UserUtil';

@Component({ components: { }, })
export default class HomeView extends Mixins(Constants, UserUtil) {

}
</script>

<template>
  <div class="home">
	<vue-headful :title="TITLE_PREFIX+'Home '"/>
	<h1>Welcome to the PatchDB!</h1>
	<p>
	  On this page, you will find a huge amount of information about Patches. Also, you can
	  <ul>
		<li>Connect with others</li>
		<li>Show off your collection</li>
		<li>Find the patches you are still looking for </li>
		<li>Exchange information and contribute to an open community</li>
		<li>. . .</li>
	  </ul>
	  <router-link v-if="!isLoggedIn" to="/register">Register now!</router-link>
	</p>
  </div>
</template>