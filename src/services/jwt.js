const tokenName = 'dependency-scanner/jwt';

export const getToken = () => localStorage.getItem(tokenName);

export const saveToken = (token) => {
  localStorage.setItem(tokenName, token);
};

export const removeToken = () => {
  localStorage.removeItem(tokenName);
};
