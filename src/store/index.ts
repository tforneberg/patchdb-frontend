import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export interface LocalUserData {
  name : string,
  id : string
}

export interface AppState {
  status: string;
  token: string | null;
  user: LocalUserData | null;
}

function getTokenFromLocalStorage(tokenKey : string) : string | null {
  let tokenJSON = localStorage.getItem(tokenKey);
  if (!tokenJSON) { return null; } 
  else {
    try { return JSON.parse(tokenJSON); } 
    catch { return null; }
  }
}

function getUserDataFromLocalStorage(key : string) : LocalUserData | null {
  let userJSON = localStorage.getItem(key);
  if (!userJSON) { return null; } 
  else {
    try { return JSON.parse(userJSON); } 
    catch { return null; }
  }
}

const storeOptions : StoreOptions<AppState> = {
  state: {
    token: getTokenFromLocalStorage('patchdb_token'),
    user: getUserDataFromLocalStorage('patchdb_localUserData'),
    status: ""
  },
  mutations: {
    auth_request(state : AppState){
      state.status = 'loading'
    },
    auth_success(state : AppState, {token, user}) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state : AppState){
      state.status = 'error'
    },
    logout(state : AppState){
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request');

        if (user.name == "tobi" && user.password == "1234") { //"mock" for if(server says yes)
          let name = user.name; //evtl später auch aus server-response objekt extrahieren
          let iD = 666; //todo ID aus server-response objekt beziehen
          let localUserData = { name, iD };
          let token = "einTollesToken";
          localStorage.setItem('patchdb_token', JSON.stringify(token));
          localStorage.setItem('patchdb_localUserData', JSON.stringify(localUserData));
          commit('auth_success', {token, localUserData});
          resolve("Jawoll!");
        } else {
          commit('auth_error');
          localStorage.removeItem('patchdb_token');
          localStorage.removeItem('patchdb_localUserData');
          reject("nope, so nicht!");
        }

        //implementation for later:
        // axios({url: 'http://localhost:3000/login', data: user, method: 'POST' })
        // .then(response => {
        //   let token = response.data.token;
        //   let user = response.data.user;
        //   localStorage.setItem('patchdb_token', JSON.stringify(token));
        //   localStorage.setItem('patchdb_localUserData', JSON.stringify(user));
        //   axios.defaults.headers.common['Authorization'] = token;
        //   commit('auth_success', {token, user});
        //   resolve(response);
        // })
        // .catch(err => {
        //   commit('auth_error');
        //   localStorage.removeItem('patchdb_token');
        //   reject(err);
        // })
      })
    },

    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({url: 'http://localhost:3000/register', data: user, method: 'POST' })
        .then(response => {
          let token = response.data.token;
          let user = response.data.user;
          localStorage.setItem('patchdb_token', JSON.stringify(token));
          localStorage.setItem('patchdb_localUserData', JSON.stringify(user));
          axios.defaults.headers.common['Authorization'] = token;
          commit('auth_success', {token, user});
          resolve(response);
        })
        .catch(err => {
          commit('auth_error', err);
          localStorage.removeItem('patchdb_token');
          localStorage.removeItem('patchdb_localUserData');
          reject(err);
        })
      })
    },

    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('patchdb_token');
        localStorage.removeItem('patchdb_localUserData');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token, //if token is falsey, return false
    loggedInUser: state => state.user,
    authStatus: state => state.status,
  }
}

export default new Vuex.Store<AppState>(storeOptions);
