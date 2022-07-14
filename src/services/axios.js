import axios from 'axios';

const baseURL = process.env.VUE_APP_GATEWAY_URL;

export default axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    'Content-type': 'application/json',
  },
});
