import { PluginApi } from 'vue-loading-overlay';
import Vue from 'vue-property-decorator';

declare module 'vue/types/vue' { 
    export interface Vue { 
        readonly $loading: PluginApi; 
    } 
}