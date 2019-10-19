import { User, Patch, HttpPatchOperation } from '@/model/Model';
import { getFromLocalStorage, RootState } from '@/store';
import axios from 'axios';
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import AuthModule from './AuthModule';
import store from '@/store';

@Module({dynamic: true, namespaced: true, store: store, name: 'PatchModule' }  )
export default class PatchModule extends VuexModule {
    patchIDs_: number[] = getFromLocalStorage('patchIDs') as number[];

    get patchIDs() : number[] {
        return this.patchIDs_;
    }

    @Mutation
    init_patches(patchIDs:number[]) : void {
        this.patchIDs_ = patchIDs;
        localStorage.setItem("patchIDs", JSON.stringify(this.patchIDs_));
    }

    @Mutation
    add_patch(patchID:number) : void {
        this.patchIDs_.push(patchID);
        localStorage.setItem("patchIDs", JSON.stringify(this.patchIDs_));
    }

    @Mutation
    remove_patch(patchID:number) : void {
        let i = this.patchIDs_.indexOf(patchID);
        if (i !== -1) {
            this.patchIDs_.splice(i, 1);
            localStorage.setItem("patchIDs", JSON.stringify(this.patchIDs_));
        }
    }

    @Mutation
    remove_all_patches() : void {
        this.patchIDs_.splice(0, this.patchIDs_.length);
        localStorage.removeItem("patchIDs");
    }

    @Action
    initPatches(patchIDs: number[]): void {
        this.context.commit('init_patches', patchIDs);
    }

    @Action
    addPatchToCollection(patchID: number): Promise<any> {
        return new Promise((resolve, reject) => {
            let request = new Patch();
            request.operation = HttpPatchOperation.add;
            request.id = patchID;
            
            let loggedInUser: User = getModule(AuthModule).loggedInUser;
            if (loggedInUser != null) {
                axios.patch('api/users/' + loggedInUser.id + '/patches', request)
                    .then(res => {
                        this.context.commit('add_patch', patchID);
                        resolve(res);
                    })
                    .catch(err => { reject(err); })
            }
        });
    }

    @Action
    removePatchFromCollection(patchID: number): Promise<any> {
        return new Promise((resolve, reject) => {
            let request = new Patch();
            request.id = patchID;
            request.operation = HttpPatchOperation.remove;

            let loggedInUser: User = getModule(AuthModule).loggedInUser;
            if (loggedInUser != null) {
                axios.patch('api/users/' + loggedInUser.id + '/patches', request)
                    .then(res => {
                        this.context.commit('remove_patch', patchID);
                        resolve(res);
                    })
                    .catch(err => { reject(err); })
            }
        });
    }

}