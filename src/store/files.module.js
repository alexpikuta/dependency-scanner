import filesService from '@/api/files.api';

const state = {
  errors: null,
  uploadID: null,
  isScanReady: false,
  scanResult: null,
};
const getters = {
  getErrors: (state) => state.errors,
  getIsScanReady: (state) => state.isScanReady,
  getScanResult: (state) => state.scanResult,
};
const actions = {
  uploadFiles: async ({ commit, state }, fileList) => {
    commit('setErrors', null);
    commit('setUploadID', null);
    commit('setIsScanReady', false);

    async function createFormDataAndUpload(file) {
      const formData = new FormData();
      if (state.uploadID) {
        formData.append('ciUploadId', state.uploadID);
      }
      formData.append('repositoryName', 'unknown');
      formData.append('commitName', 'unknown');
      formData.append('fileData', file);
      const result = await filesService.upload(formData);

      if (!state.uploadID) {
        // store ID for the next files in queue
        commit('setUploadID', result.data.ciUploadId);
      }
    }

    try {
      // Disable eslint rule to use for...of loop
      // eslint-disable-next-line
      for await (const file of fileList) {
        // upload each file in array
        await createFormDataAndUpload(file);
      }
    } catch (error) {
      commit('setErrors', error);
    }
  },
  scanFiles: async ({ state, commit }) => {
    try {
      await filesService.scan(state.uploadID);
      commit('setIsScanReady', true);
    } catch (error) {
      commit('setErrors', error);
    }
  },
  getStatus: async ({ commit }) => {
    try {
      const result = await filesService.status(state.uploadID);
      commit('setScanResult', result.data?.dependencyFiles);
    } catch (error) {
      commit('setErrors', error);
    }
  },
  resetErrors: async ({ commit }) => {
    commit('setErrors', null);
  },
};

const mutations = {
  setErrors: (state, errors) => {
    state.errors = errors?.response?.data?.message || errors;
  },
  setUploadID: (state, id) => {
    state.uploadID = id;
  },
  setIsScanReady: (state, result) => {
    state.isScanReady = result;
  },
  setScanResult: (state, data) => {
    state.scanResult = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
