import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class Constants extends Vue {
    public readonly TITLE_PREFIX : string = "PatchDB - ";
}