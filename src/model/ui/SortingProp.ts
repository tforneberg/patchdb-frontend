export class SortingProp {
    key:number;
    propName:String;
    propLabel:String;
    direction:Direction;
}

export enum Direction {
    asc, desc
}

export const PatchSortingProps : Array<SortingProp> = [
    { key:1, propName: "dateInserted", propLabel: "Date", direction: Direction.desc },
    { key:2, propName: "dateInserted", propLabel: "Date", direction: Direction.asc },
    { key:3, propName: "name", propLabel: "Name", direction: Direction.asc },
    { key:4, propName: "name", propLabel: "Name", direction: Direction.desc },
    { key:5, propName: "amountUsers", propLabel: "Collectors", direction: Direction.desc }, 
    { key:6, propName: "amountUsers", propLabel: "Collectors", direction: Direction.asc }
]
