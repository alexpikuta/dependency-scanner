import Vue from 'vue';
import VueRouter from 'vue-router';
import { getToken } from '@/services/jwt';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const token = getToken();

  if (to.name === 'Login' && token) {
    next({ name: 'Home' });
  }
  if (to.name !== 'Login') {
    if (!token) {
      next({ name: 'Login' });
    }
  }
  next();
});

export default router;
