import Vue from 'vue';
import axios from 'axios';
import setupInterceptorsTo from '@/services/interceptors';
import App from './App.vue';
import router from './router';
import store from './store';

setupInterceptorsTo();

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
