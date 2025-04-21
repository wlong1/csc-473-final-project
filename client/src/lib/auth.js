const TOKEN_KEY = 'lost-and-found-token';

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
