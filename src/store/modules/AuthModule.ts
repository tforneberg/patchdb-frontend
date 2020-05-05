import { User } from '@/model/Model';
import { LoginRequestData } from '@/model/ui/LoginRequestData';
import { getFromLocalStorage } from '@/store';
import axios from 'axios';
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import PatchModule from './PatchModule';
import store from '@/store';

@Module({dynamic: true, namespaced: true, store: store, name: 'AuthModule' })
export default class AuthModule extends VuexModule {
    auth: boolean = <boolean> getFromLocalStorage('auth');
    user: User = <User> getFromLocalStorage('user');
    errorMsg: string = null;
    loading: boolean = false;

    get isLoggedIn() : boolean {
        return this.auth;
    }

    get loggedInUser() : User {
        return this.user;
    }

    get isLoading() : boolean {
        return this.loading;
    }

    get error() : string {
        return this.errorMsg;
    }

    @Mutation
    private auth_request(loading:boolean) : void {
        this.loading = loading;
    }

    @Mutation
    private auth_success(user:User) {
        this.loading = false;
        this.errorMsg = null;

        this.auth = true;
        localStorage.setItem("auth", JSON.stringify(true));
        this.user = user;
        localStorage.setItem("user", JSON.stringify(user));
    }

    @Mutation
    private auth_error(error:string) {
        this.errorMsg = error;
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
    }

    @Mutation
    private logout_() {
        this.auth = false;
        localStorage.removeItem('auth');
        this.user = null;
        localStorage.removeItem('user');
    }

    @Action
    login(requestData: LoginRequestData): Promise<any> {
        return new Promise((resolve, reject) => {
            this.context.commit('auth_request');

            axios.get('/api/users/login'+ (requestData.remember ? '?remember=true' : ''), {
                auth: {
                    username: requestData.name,
                    password: requestData.password,
                }
            }).then(response => {
                axios.get('/api/users/findByName/' + requestData.name)
                    .then(response2 => {
                        let user = new User();
                        user.id = response2.data.id;
                        user.name = response2.data.name,
                        user.status = response2.data.status,
                        user.image = response2.data.image;

                        this.context.commit('auth_success', user);
                        let patchIDs = response2.data.patchIDs;
                        
                        getModule(PatchModule).initPatches(patchIDs);
                        resolve(response);
                    })
                    .catch(error2 => {
                        this.context.commit('auth_error', error2);
                        reject(error2);
                    })
                })
                .catch(error => {
                    this.context.commit('auth_error', { error });
                    reject(error);
                });
            }
        );
    }

    @Action
    logout() : Promise<any> {
        return new Promise((resolve, reject) => {
            this.context.commit('logout_'); 
            //tell the server to logout and invalidate the cookies (must be POST)
            axios({ url: '/api/logout', method: 'POST' });

            resolve();
            }
        );
    }

}