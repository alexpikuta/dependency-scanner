import router from '@/router';
import Gateway from '@/services/axios';
import { getToken, removeToken } from '@/services/jwt';

// Add fwt-token to header of each request
const onRequest = (requestConfig) => {
  let config = requestConfig;
  if (getToken() && requestConfig) {
    const token = getToken();
    config = {
      ...requestConfig,
      headers: {
        ...requestConfig.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
  }
  return config;
};

const onRequestError = (error) => Promise.reject(error);

const onResponse = (response) => response;

// Redirect to Login in case of 401 or 403 error
const onResponseError = async (error) => {
  const status = error?.response?.status;
  if (status && [401, 403].includes(status)) {
    removeToken();
    // avoid redundant navigation to current location
    if (router.history.current.name !== 'Login') {
      await router.replace({ name: 'Login' });
    }
  }
  return Promise.reject(error);
};

const setupInterceptorsTo = () => {
  Gateway.interceptors.request.use(onRequest, onRequestError);
  Gateway.interceptors.response.use(onResponse, onResponseError);
};

export default setupInterceptorsTo;
