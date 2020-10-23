import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../views/layout/Layout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: Layout,
    redirect: {name: 'home'},
    children: [{
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue'),
    }, {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/about/About.vue'),
    }],
  },

];

const router = new VueRouter({
  routes,
});

export default router;
