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
    backend: 'http://localhost:5000/'
  }
};

export default new Vuex.Store<RootState>(storeOptions);
