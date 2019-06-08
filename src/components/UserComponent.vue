<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';
    import { User } from '@/model/User';
    const namespace: string = 'AuthModule' //Vuex module namespace

    @Component
    export default class UserComponent extends Vue {
        @Prop() private user?: User;

        //Vuex getter binding generated properties
        @Getter('loggedInUser', { namespace: 'AuthModule' }) 
        private loggedInUser?: User|null;
        
        @Getter('patchIDs', { namespace: 'PatchModule' })
        private patchIDsOfLoggedInUser?: number[];

        getThumbnailPathFromURL(url:string) {
            if (url != null && url != '') {
                //TODO
            } else {
                //TODO return default image
            } 
        }

    }
</script>

<template>
<b-card id="userCard" >
    <div v-if="user" id="userComponent">
        <h3><router-link :to="'/user/'+user.id">{{user.name}}</router-link></h3>
        <router-link :to="'/user/'+user.id">
            <img :src="getThumbnailPathFromURL(user.image)"/>
        </router-link>
        <div id="buttonsDiv" v-if="loggedInUser">
           <!-- Add buttons for logged in users here -->
        </div>
    </div>
</b-card>
</template>

<style scoped lang="scss">
img {
  width: 100%;
  height: auto;
  margin-bottom: 5px;
  border: 2px solid black;
//   border: 5px solid transparent;
//   border-image: url('../assets/border.png') 30 round;

}

#buttonsDiv {
    text-align:center;
}
</style>