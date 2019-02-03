import { LoginRequestData, RegisterRequestData } from '@/model/RequestData';
import { Module, MutationTree, GetterTree, ActionTree } from 'vuex';
import { User } from '@/model/User';
import { getFromLocalStorage, RootState } from '@/store';
import axios from 'axios';

interface AuthState {
    status: string;
    token: string | null;
    user: User | null;
}

const state: AuthState = {
    token: <string|null> getFromLocalStorage('token'),
    user: <User|null> getFromLocalStorage('user'),
    status: ""
};

const namespaced: boolean = true;

const mutations: MutationTree<AuthState> = {
    auth_request(state : AuthState){
      state.status = 'loading';
    },
    auth_success(state : AuthState, payload: any) {
      state.status = 'success';
      state.token = payload.token;
      state.user = payload.user;
    },
    auth_error(state : AuthState){
      state.status = 'error';
    },
    logout(state : AuthState){
      state.status = '';
      state.token = '';
      state.user = null;
    },
};

const actions: ActionTree<AuthState, RootState> = {
    login({commit}, requestData : LoginRequestData) : any {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        if (requestData.name == "tobi" && requestData.password == "1234") { //"mock" for if(server says yes)
          let user = new User(requestData.name, 666);
          let token = "einTollesToken";
          localStorage.setItem('token', JSON.stringify(token));
          localStorage.setItem('user', JSON.stringify(user));
          commit('auth_success', {token, user});
          resolve("Jawoll!");
        } else {
          commit('auth_error');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          reject("nope, so nicht!");
        }

        //implementation for later:
        // axios({url: 'http://localhost:3000/login', data: requestData, method: 'POST' })
        // .then(response => {
        //   let token = response.data.token;
        //   let user = new User(response.data.user.name, response.data.user.id);
        //   localStorage.setItem('token', JSON.stringify(token));
        //   localStorage.setItem('user', JSON.stringify(user));
        //   axios.defaults.headers.common['Authorization'] = token;
        //   commit('auth_success', {token, user});
        //   resolve(response);
        // })
        // .catch(err => {
        // localStorage.removeItem('token');
        // localStorage.removeItem('user');
        //   reject(err);
        // })
      })
    },

    register({commit}, requestData : RegisterRequestData){
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({url: 'http://t-forneberg.de/register', data: requestData, method: 'POST' })
        .then(response => {
          let token = response.data.token;
          let user = new User(response.data.user.name, response.data.user.id);
          localStorage.setItem('token', JSON.stringify(token));
          localStorage.setItem('user', JSON.stringify(user));
          axios.defaults.headers.common['Authorization'] = token;
          commit('auth_success', {token, user});
          resolve(response);
        })
        .catch(err => {
          commit('auth_error', err);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          reject(err);
        })
      })
    },

    logout({commit}){
      return new Promise((resolve, reject) => {
        //todo: remove token on server side
        commit('logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      })
    }
};

const getters: GetterTree<AuthState, RootState> = {
    isLoggedIn: state => !!state.token, //if token is falsey, return false
    loggedInUser: state => state.user,
    authStatus: state => state.status,
};

export const AuthModule: Module<AuthState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};