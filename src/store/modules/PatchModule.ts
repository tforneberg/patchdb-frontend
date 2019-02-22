import { User } from '@/model/User';
import { Module, MutationTree, GetterTree, ActionTree } from 'vuex';
import { getFromLocalStorage, RootState } from '@/store';
import axios from 'axios';

interface PatchState {
    patchIDs : number[]
}

//init the state object with these values at startup
const state: PatchState = {
    patchIDs: <number[]> getFromLocalStorage('patchIDs'),
}

const namespaced: boolean = true;

const mutations: MutationTree<PatchState> = {
    init_patches(state: PatchState, payload: any) {
        state.patchIDs = payload.patchIDs;
        localStorage.setItem("patchIDs", JSON.stringify(state.patchIDs));
    },
    add_patch(state: PatchState, payload: any) {
        state.patchIDs.push(payload.patchID);
        localStorage.setItem("patchIDs", JSON.stringify(state.patchIDs));
    },
    remove_patch(state: PatchState, payload: any) {
        let i = state.patchIDs.indexOf(payload.patchID);
        if (i !== -1) {
            state.patchIDs.splice(i, 1);
            localStorage.setItem("patchIDs", JSON.stringify(state.patchIDs));
        }
        
    },
    remove_all_patches(state: PatchState, payload: any) {
        state.patchIDs.splice(0, state.patchIDs.length);
        localStorage.removeItem("patchIDs");
    }
};

const actions: ActionTree<PatchState, RootState> = {
    initPatches({ commit }, patchIDs: number[]): any {
        commit('init_patches', { patchIDs })
    },

    addPatchToCollection({ commit }, patchID: number): any {
        return new Promise((resolve, reject) => {
            let data = { "op": "add", "path": "/", "value": patchID };
            let loggedInUser : User = this.getters['AuthModule/loggedInUser'];
            if (loggedInUser != null) {
                axios.patch('api/users/' + loggedInUser.id + '/patches/', data)
                    .then(res => {
                        commit('add_patch', { patchID });
                        resolve(res);
                    })
                    .catch(err => { reject(err); })
            }
        })
    },

    removePatchFromCollection({ commit }, patchID: number): any {
        return new Promise((resolve, reject) => {
            let data = { "op": "remove", "path": "/", "value": patchID };
            let loggedInUser: User = this.getters['AuthModule/loggedInUser'];
            if (loggedInUser != null) {
                axios.patch('api/users/' + loggedInUser.id + '/patches/', data)
                    .then(res => {
                        commit('remove_patch', { patchID });
                        resolve(res);
                    })
                    .catch(err => { reject(err); })
            }
        })
    },
};

const getters: GetterTree<PatchState, RootState> = {
    patchIDs: state => state.patchIDs,
};

export const PatchModule: Module<PatchState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};