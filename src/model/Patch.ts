import { User } from './User';

export class Patch {
    constructor(
        public id: number,
        public name: string,
        public dateInserted: string, 
        public userInserted: User, 
        public usersChanged?: User[],
        public datesChanged?: string[],
        public band?: string,
        public description?: string,
        public image?: any
    ) {}
}