<script lang="ts">
    import { Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class AlertComponent extends Vue {
        @Prop({default: false}) public show : boolean;
        @Prop({default: false}) public error : boolean;
        @Prop({default: true}) public success : boolean;

        mounted() {
         }
    }
</script>

<template>
    <transition name="fade">
        <div v-if="show" class="text-center alert" :class="error ? 'alert-danger' : success ? 'alert-success' : ''" role="alert">
            <slot></slot>
        </div>
    </transition>
</template>

<style scoped lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: all 0.5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>