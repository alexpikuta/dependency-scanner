import Vue from 'vue';
import Vuex from 'vuex';
import account from './account.module';
import files from './files.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    files,
  },
});
