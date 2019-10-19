/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.17.558 on 2019-10-15 22:25:18.

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

export class LoginRequestData {
    name: string;
    password: string;
}

export class RegisterRequestData {
    email: string;
    name: string;
    password: string;
    password2: string;
    acceptedTerms: boolean;
}

export const enum PatchState {
    approved = "approved",
    notApproved = "notApproved",
}

export const enum PatchType {
    woven = "woven",
    stitched = "stitched",
    printed = "printed",
}

export const enum HttpPatchOperation {
    add = "add",
    remove = "remove",
}

export const enum UserStatus {
    admin = "admin",
    mod = "mod",
    user = "user",
    blockedUser = "blockedUser",
}
