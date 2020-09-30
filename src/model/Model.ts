/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.17.558 on 2020-09-30 18:05:19.

export class Band {
    id: number;
    name: string;
    patchIDs: number[];
}

export class Collection {
    patches: Patch[];
    username: string;
}

export class News {
    id: number;
    title: string;
    content: string;
    created: string;
    creator: User;
}

export class Patchable {
    operation: HttpPatchOperation;
    path: string;
    value: string;
}

export class Patch extends Patchable {
    id: number;
    name: string;
    dateInserted: string;
    userInserted: User;
    band: Band;
    description: string;
    image: string;
    type: PatchType;
    state: PatchState;
    numOfCopies: number;
    releaseDate: string;
    manufacturer: string;
    users: User[];
    amountUsers: number;
}

export class User {
    id: number;
    name: string;
    status: UserStatus;
    image: string;
    patchIDs: number[];
}

export class ChangePasswordRequestData {
    password: string;
    password2: string;
}

export class RegisterRequestData {
    email: string;
    name: string;
    password: string;
    password2: string;
    acceptedTerms: boolean;
}

export enum PatchState {
    approved = "approved",
    notApproved = "notApproved",
}

export enum PatchType {
    Woven = "Woven",
    Stitched = "Stitched",
    Printed = "Printed",
}

export enum HttpPatchOperation {
    add = "add",
    remove = "remove",
    replace = "replace",
}

export enum UserStatus {
    admin = "admin",
    mod = "mod",
    user = "user",
    blockedUser = "blockedUser",
}
