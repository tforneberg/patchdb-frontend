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

        @Emit("changed") 
        private onChanged(newSelection:SortingProp) : void {
            this.selectedItem = newSelection;
        }

        private getOptionLabel(option:SortingProp) : string {
            return option.propLabel + (option.direction == Direction.desc ? " (absteigend)" : " (aufsteigend)");
        }

        get labelWithDirection() : string {
            return this.selectedItem.propLabel + (this.selectedItem.direction == Direction.desc ? " (absteigend)" : " (aufsteigend)");
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
    }
</script>

<template>
    <b-dropdown>
        <template slot="button-content">
           Sortiert nach: {{labelWithDirection}}
        </template>
        <b-dropdown-item v-for="sortingProp in sortingProps" :key="sortingProp.key" @click="onChanged(sortingProp)">
            {{getOptionLabel(sortingProp)}}
        </b-dropdown-item>
    </b-dropdown>
</template>

<style scoped lang="scss">

</style>