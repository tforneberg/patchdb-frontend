import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class Constants extends Vue {
    public readonly TITLE_PREFIX : string = "PatchDB - ";
    public readonly RECAPTCHA_SITE_KEY : string = "6LdM9JUdAAAAAHmEW33l9o6UzBQd-8cB2wSan5sB";
}