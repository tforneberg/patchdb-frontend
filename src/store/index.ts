import { RootState } from '@/store';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { AuthModule } from './modules/AuthModule';

Vue.use(Vuex);

export function getFromLocalStorage(key : string) : Object | null {
  let tokenJSON = localStorage.getItem(key);
  if (!tokenJSON) { return null; } 
  else {
    try { return JSON.parse(tokenJSON); } 
    catch { return null; }
  }
}

export interface RootState {
  version: string;
  backend: string;
}

const storeOptions : StoreOptions<RootState> = {
  modules: {
    AuthModule,
  },
  state: {
    version: '1.0.0',
    backend: 'http://localhost:5000/'
  }
};

export default new Vuex.Store<RootState>(storeOptions);
