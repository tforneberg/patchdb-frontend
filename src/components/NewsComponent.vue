<script lang="ts">
    import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
    import { News, User } from '@/model/Model';
    import { UserUtil } from '@/util/UserUtil';

    @Component
    export default class UserComponent extends Mixins(UserUtil) {
        @Prop() private news?: News;

    }
</script>

<template>
<b-card id="newsCard" >
    <div v-if="news" id="newsComponent">
        <h3><router-link :to="'/news/'+news.id">{{news.title}}</router-link></h3>
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