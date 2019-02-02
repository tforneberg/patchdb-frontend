import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index';

import Home from './views/HomeView.vue';
import LatestView from './views/LatestView.vue';
import LoginView from './views/LoginView.vue';
import RegisterView from './views/RegisterView.vue';
import ShowUserView from './views/ShowUserView.vue';
import PatchView from './views/PatchView.vue';
import NotFoundView from './views/NotFoundView.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home, },
    { path: '/latest', name: 'latest', component: LatestView, },
    { path: '/login', name: 'login', component: LoginView, meta: { reqLoggedOut: true }, },
    { path: '/register', name: 'register', component: RegisterView, meta: { reqLoggedOut: true }, },
    { path: '/user', name: 'user', component: ShowUserView, meta: { reqAuth: true }, },
    { path: '/patch', name: 'patch', component: PatchView, },
    { path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/AboutView.vue'),
    },
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
    if (store.getters.isLoggedIn) {
      next(); 
    } else {
      next('/login');
    }
  } else if(to.matched.some(record => record.meta.reqLoggedOut)) {
    //if the desired routed requires being logged out, check if user is logged out
    if (!store.getters.isLoggedIn) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

export default router;