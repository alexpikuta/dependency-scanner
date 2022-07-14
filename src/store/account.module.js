import userService from '@/api/user.api';
import { saveToken } from '@/services/jwt';

const state = {
  errors: null,
};
const getters = {
  getErrors: (state) => state.errors,
};

const actions = {
  login: async ({ commit }, { username, password }) => {
    commit('setErrors', null);
    try {
      const token = await userService.login({ username, password });
      saveToken(token.data?.token);
      return true;
    } catch (error) {
      commit('setErrors', error.response?.data?.message);
    }
    return null;
  },
};

const mutations = {
  setErrors: (state, errors) => {
    state.errors = errors;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
