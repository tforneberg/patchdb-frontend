import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index';

import AddPatchView from './views/AddPatchView.vue';
import ArtistView from './views/ArtistView.vue';
import CollectionView from './views/CollectionView.vue';
import EditProfileView from './views/EditProfileView.vue';
import HomeView from './views/HomeView.vue';
import LatestView from './views/LatestView.vue';
import UsersView from './views/UsersView.vue';
import LoginView from './views/LoginView.vue';
import NotFoundView from './views/NotFoundView.vue';
import OverviewView from './views/OverviewView.vue';
import PatchDetailsView from './views/PatchDetailsView.vue';
import RegisterView from './views/RegisterView.vue';
import RegistrationSuccessful from './views/RegistrationSuccessfulView.vue';
import SettingsView from './views/SettingsView.vue';
import ShowUserView from './views/ShowUserView.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    //public routes
    { path: '/', name: 'home', component: HomeView, },
    { path: '/latest', name: 'latest', component: LatestView, },
    { path: '/login', name: 'login', component: LoginView, meta: { reqLoggedOut: true }, },
    { path: '/register', name: 'register', component: RegisterView, meta: { reqLoggedOut: true }, },
    { path: '/registrationSuccessful', name: 'registrationSuccessful', component: RegistrationSuccessful, },
    { path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/AboutView.vue'),
    },
    { path: '/artist/:id', name: 'artist', component: ArtistView, props: true, },
    { path: '/patch/:id', name: 'patch', component: PatchDetailsView, props: true, },

    //access for all logged in users
    { path: '/users', name: 'users', component: UsersView, meta: { reqAuth: true } },
    { path: '/overview', name: 'overview', component: OverviewView, meta: { reqAuth: true }  },
    { path: '/user/:id', name: 'user', component: ShowUserView, props: true, meta: { reqAuth: true }, },
    { path: '/user/:id/collection', name: 'collection', component: CollectionView, props: true, meta: { reqAuth: true }, },
    { path: '/user/edit/profile', name: 'editProfile', component: EditProfileView, meta: { reqAuth: true }, },
    { path: '/settings', name: 'settings', component: SettingsView, meta: { reqAuth: true }, },
    { path: '/add/patch', name: 'addPatch', component: AddPatchView, meta: { reqAuth: true }, },

    //NotFoundView
    { path: '*', component: NotFoundView }
  ],
});

/**
*  check if user is allowed to go to the desired route
*  "to" argument: route the user wants to go to 
*  "from" argument: route the user comes from
*  "next" a function that needs to be called. 
*   if next() is called, the navigation is confirmed. if next('/somePath') is called, the user gets redirected to 'somePath' 
*/
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.reqAuth)) {
    //if the desired routed requires authentication, check if user is logged in
    if (store.getters['AuthModule/isLoggedIn']) {
      next(); 
    } else {
      next('/login');
    }
  } else if(to.matched.some(record => record.meta.reqLoggedOut)) {
    //if the desired routed requires being logged out, check if user is logged out
    if (!store.getters['AuthModule/isLoggedIn']) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

export default router;