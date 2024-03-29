import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

Vue.use(Vuex);

export function getFromLocalStorage(key : string) : Object | null {
  let itemAsJSON: string|null = localStorage.getItem(key);
  if (!itemAsJSON) { return null; } 
  else {
    try { return JSON.parse(itemAsJSON); } 
    catch { return null; }
  }
}

export interface RootState {
  version: string;
  backend: string;
}

const storeOptions : StoreOptions<RootState> = {
  state: {
    version: '1.0.0',
    //backend: 'http://localhost:8080/' //TODO set this via .env.production for production releases to be the real deal server url
    backend: window.location.origin
  }
};

export default new Vuex.Store<RootState>(storeOptions);
