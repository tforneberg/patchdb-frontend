<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/model/User'
import UserComponent from '@/components/UserComponent.vue';
import axios from 'axios';

@Component({ components: { UserComponent }, })
export default class UsersView extends Vue {
  private users:User[] = [];
  private currentPage:number = 0;
  private size:number = 12;

  private loadNextButtonVisible:boolean = true;

  created() {
    this.loadUsers();
  }

  private loadUsers() : void {
    axios.get('api/users?page='+this.currentPage+'&size='+this.size)
      .then(response => {
        var newUsers = response.data._embedded.users;
        this.users.push(...newUsers);
        this.currentPage++;
        if (newUsers.length < this.size) {
          this.loadNextButtonVisible = false;
        }
      })
      .catch(err => { //TODO error message?
      }); 
  }
}
</script>

<template>
  <div>
    <div class="row">
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
