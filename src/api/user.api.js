import Gateway from '@/services/axios';

const login = ({ username, password }) => Gateway.post('login_check', {
  _username: username,
  _password: password,
});

export default {
  login,
};
