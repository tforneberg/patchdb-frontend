<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Constants } from '@/util/Constants';
import { User } from '@/model/Model'
import UserComponent from '@/components/UserComponent.vue';

@Component({ components: { UserComponent }, })
export default class UserListView extends Mixins(Constants) {
	private users:User[] = [];
	private currentPage:number = 0;
	private size:number = 12;

	private loadNextButtonVisible:boolean = false;

	created() {
		this.loadUsers();
	}

	private loadUsers() : void {
		let loader = this.$loading.show({container: this.$refs.loadingContainer});
		this.axios.get('api/users?page='+this.currentPage+'&size='+this.size)
		.then(response => {
			var newUsers = response.data;
			this.users.push(...newUsers);
			this.currentPage++;
			this.loadNextButtonVisible = newUsers.length == this.size;
		})
		.catch(err => { //TODO error message?
		})
		.finally(() => loader.hide()); 
	}
}
</script>

<template>
  <div class="text-center">
	<vue-headful :title="TITLE_PREFIX+'Users '"/>

	<h1>Users</h1>
	
	<div class="row" ref="loadingContainer">
	  <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="user in users" v-bind:key="user.id">
		<UserComponent class="mx-3 my-3" v-bind:user="user"/>
	  </div>
	</div>

	<div class="text-center">
	  <button v-if="loadNextButtonVisible" id="loadNextEntries" @click="loadUsers()" type="submit" class="btn btn-primary">Load next Users</button>
	</div>
  </div>
</template> 

<style lang="scss" scoped>

</style>
