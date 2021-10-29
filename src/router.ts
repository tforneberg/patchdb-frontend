import Vue from 'vue';
import Router from 'vue-router';
import { getModule } from 'vuex-module-decorators';
import AuthModule from '@/store/modules/AuthModule';
import { UserUtil } from '@/util/UserUtil';

import AddPatchView from './views/patch/AddPatchView.vue';
import ArtistView from './views/artist/ArtistView.vue';
import CollectionView from './views/collection/CollectionView.vue';
import EditProfileView from './views/user/EditProfileView.vue';
import HomeView from './views/HomeView.vue';
import ImprintView from './views/ImprintView.vue';
import TermsAndConditionsView from './views/TermsAndConditionsView.vue';
import PatchListView from './views/patch/PatchListView.vue';
import UserListView from './views/user/UserListView.vue';
import NewsListView from './views/news/NewsListView.vue';
import NewsDetailsView from './views/news/NewsDetailsView.vue';
import LoginView from './views/user/LoginView.vue';
import NotFoundView from './views/NotFoundView.vue';
import OverviewView from './views/OverviewView.vue';
import PatchDetailsView from './views/patch/PatchDetailsView.vue';
import RegisterView from './views/user/RegisterView.vue';
import RegistrationSuccessful from './views/user/RegistrationSuccessfulView.vue';
import SettingsView from './views/user/SettingsView.vue';
import ShowUserView from './views/user/ShowUserView.vue';
import { UserStatus } from './model/Model';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    //public routes
    { path: '/', name: 'home', component: HomeView, },
    { path: '/patches', name: 'patches', component: PatchListView, },
    { path: '/login', name: 'login', component: LoginView, 
        meta: { reqLoggedOut: true }, },
    { path: '/register', name: 'register', component: RegisterView, 
        meta: { reqLoggedOut: true }, },
    { path: '/registrationSuccessful', name: 'registrationSuccessful', component: RegistrationSuccessful, },
    { path: '/news', name: 'newsList', component: NewsListView, },
    { path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/AboutView.vue'),
    },
    { path: '/imprint', name: 'imprint', component: ImprintView, props: true },
    { path: '/terms', name: 'terms', component: TermsAndConditionsView, props: true },
    { path: '/artist/:id', name: 'artist', component: ArtistView, props: true, },
    { path: '/patch/:id', name: 'patch', component: PatchDetailsView, props: true, },
    { path: '/news/:id', name: 'news', component: NewsDetailsView, props: true, },
    //access for all logged in users
    { path: '/users', name: 'users', component: UserListView, meta: { reqAuth: true } },
    { path: '/overview', name: 'overview', component: OverviewView, meta: { reqAuth: true }  },
    { path: '/user/:id', name: 'user', component: ShowUserView, props: true, meta: { reqAuth: true }, },
    { path: '/user/:id/collection', name: 'collection', component: CollectionView, props: true, meta: { reqAuth: true }, },
    { path: '/user/:id/patchesCreated', name: 'patchesCreatedByUser', component: PatchListView, meta: { reqAuth: true }, 
        props: (route) => ({ title: route.params.title, endpointUrl: '/api/patches/userCreated/'+route.params.id})},
    { path: '/user/edit/profile', name: 'editProfile', component: EditProfileView, meta: { reqAuth: true }, },
    { path: '/settings', name: 'settings', component: SettingsView, meta: { reqAuth: true }, },
    { path: '/add/patch', name: 'addPatch', component: AddPatchView, meta: { reqAuth: true }, },
    //access for admin/mods only
    { path: '/patches/approvalNeeded', name: 'patchesWithApprovalNeeded', component: PatchListView, meta: { reqAdminOrMod: true }, 
        props: { endpointUrl: '/api/patches/approvalNeeded', title: 'New submissions for approval', showCollectionButtons : false, showSearchBar : false}},
    //NotFoundView
    { path: '*', name: 'notFound', component: NotFoundView }
  ],
});

/**
*  check if user is allowed to go to the desired route
*  "to" argument: route the user wants to go to, "from" argument: route the user comes from
*   if next() is called, the navigation is confirmed. if next('/somePath') is called, the user gets redirected to 'somePath' 
*/
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.reqAuth)) {
    if (getModule(AuthModule).isLoggedIn) {
      next(); 
    } else {
      next('/login');
    }
  } else if(to.matched.some(record => record.meta.reqLoggedOut)) {
    if (!getModule(AuthModule).isLoggedIn) {
      next();
    } else {
      next('/');
    }
  } else if(to.matched.some(record => record.meta.reqAdminOrMod)) {
    let status: UserStatus = getModule(AuthModule).loggedInUser.status;
    if (status == UserStatus.admin || status == UserStatus.mod) {
      next();
    } else {
      next('/');
    }
  } else if (to.matched.some(record => record.meta.reqMod)) {
    let status: UserStatus = getModule(AuthModule).loggedInUser.status;
    if (status == UserStatus.mod) {
      next();
    } else {
      next('/');
    }
  } else if (to.matched.some(record => record.meta.reqAdmin)) {
    let status: UserStatus = getModule(AuthModule).loggedInUser.status;
    if (status == UserStatus.admin) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

export default router;