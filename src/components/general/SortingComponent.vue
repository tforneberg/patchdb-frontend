<script lang="ts">
    import { Component, Prop, Vue, Emit} from 'vue-property-decorator';
    import { SortingProp, Direction, PatchSortingProps } from '@/model/ui/SortingProp';

    @Component
    export default class SortingComponent extends Vue {
        @Prop() public sortingProps : Array<SortingProp>;

        private selectedItem : SortingProp = new SortingProp();

        mounted() {
            if (this.sortingProps != null && this.sortingProps.length > 0) {
                this.selectedItem = this.sortingProps[0];
            }
        }

        get selectedItemLabelWithDirection() : string {
            return this.selectedItem.propLabel + (this.selectedItem.direction == Direction.desc ? " (descending)" : " (ascending)");
        }

        get cssClassForButtonArrow() : string {
            return this.selectedItem.direction == Direction.asc ? "dropdown-toggle-upwards" : "";
        }

        public getSortUrlString() : string {
            return '&sortBy='+this.selectedItem.propName+'&direction='+Direction[this.selectedItem.direction];
        }

        public getSelectedItem() : SortingProp {
            return this.selectedItem;
        }

        public setSelectedItem(newSelection:SortingProp) : void {
            this.selectedItem = newSelection;
        }

        @Emit("changed") 
        private onChanged(newSelection:SortingProp) : void {
            this.selectedItem = newSelection;
        }

        private getOptionLabel(option:SortingProp) : string {
            return option.propLabel + (option.direction == Direction.desc ? " (descending)" : " (ascending)");
        }
    }
</script>

<template>
    <b-dropdown :class="cssClassForButtonArrow">
        <template slot="button-content">
           Sort by: {{selectedItemLabelWithDirection}}
        </template>
        <b-dropdown-item v-for="sortingProp in sortingProps" :key="sortingProp.key" @click="onChanged(sortingProp)">
            {{getOptionLabel(sortingProp)}}
        </b-dropdown-item>
    </b-dropdown>
</template>

<style scoped lang="scss">

</style>