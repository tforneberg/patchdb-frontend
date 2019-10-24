<script lang="ts">
    import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
    import { User } from '@/model/Model';
    import { UserUtil } from '@/util/UserUtil';
    import { ImageUtil } from '@/util/ImageUtil';

    @Component
    export default class UserComponent extends Mixins(UserUtil, ImageUtil) {
        @Prop() private user?: User;

    }
</script>

<template>
<b-card id="userCard" >
    <div v-if="user" id="userComponent">
        <h3><router-link :to="'/user/'+user.id">{{user.name}}</router-link></h3>
        <router-link :to="'/user/'+user.id">
            <img :src="user.image != null ? getThumbnailPathFromURL(user.image) : require('@/assets/defaultUser.png')"/>
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