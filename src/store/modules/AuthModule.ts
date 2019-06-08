import { LoginRequestData } from '@/model/RequestData';
import { Module, MutationTree, GetterTree, ActionTree } from 'vuex';
import { User } from '@/model/User';
import { getFromLocalStorage, RootState } from '@/store';
import axios from 'axios';

interface AuthState {
    auth: boolean | null;
    user: User | null;
    error: string | null;
    loading: boolean
}

//init the state object with these values at startup
const state: AuthState = {
    auth: <boolean|null> getFromLocalStorage('auth'),
    user: <User|null> getFromLocalStorage('user'),
    error: null,
    loading: false
};

const namespaced: boolean = true;

const mutations: MutationTree<AuthState> = {
    auth_request(state : AuthState, payload){
      state.loading = payload;
    },
    auth_success(state : AuthState, payload: any) {
      state.loading = false;
      state.error = null;

      state.auth = true;
      localStorage.setItem("auth", JSON.stringify(true));
      state.user = payload.user;
      localStorage.setItem("user", JSON.stringify(payload.user));
    },
    auth_error(state : AuthState, payload: any){
      state.error = payload;
      localStorage.removeItem('auth');
      localStorage.removeItem('user');
    },
    logout(state : AuthState){
      state.auth = false;
      localStorage.removeItem('auth');
      state.user = null;
      localStorage.removeItem('user');
    },
};

const actions: ActionTree<AuthState, RootState> = {
    login({commit}, requestData : LoginRequestData) : any {
      return new Promise((resolve, reject) => {
        commit('auth_request');

        axios.get('', {
          auth: {
            username: requestData.name,
            password: requestData.password
          }
        })
        .then(response => {
          axios.get('api/users/search/findByName?projection=compact&name='+requestData.name)
          .then(res => {
            let user = new User(res.data.id, res.data.name, res.data.status, res.data.image)
            commit('auth_success', {user});
            let patchIDs = res.data.patchIDs;
            this.dispatch('PatchModule/initPatches', patchIDs, { root: true })
            resolve(response);
          })
          .catch(err => {
            commit('auth_error', {err});
            reject(err);
          })
        })
        .catch(err => {
          commit('auth_error', {err});
          reject(err);
        })
      })
    },

    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout');
        //tell the server to logout and invalidate the cookies (must be POST)
        axios({url: 'api/logout', method: 'POST'});

        resolve();
      })
    }
};

const getters: GetterTree<AuthState, RootState> = {
    isLoggedIn: state => state.auth,
    loggedInUser: state => state.user,
    isLoading: state => state.loading,
    error: state => state.error
};

export const AuthModule: Module<AuthState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};