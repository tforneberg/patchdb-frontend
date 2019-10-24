import Vue from 'vue-property-decorator';

declare module 'vue/types/vue' { 
    export interface Vue { 
        $loading: any; 
    } 
}