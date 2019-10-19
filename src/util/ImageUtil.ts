import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class ImageUtil extends Vue {

    public getThumbnailPathFromURL(url: string) : string {
        if (!url) return "";
        let index: number = url.lastIndexOf('/') + 1;
        return url.slice(0, index) + 's_' + url.slice(index);
    }

}