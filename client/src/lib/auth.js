const TOKEN_KEY = 'token';
const USER_ROLE = 'role';

export const setAuthToken = (token, role) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_ROLE, role);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getRole = () => {
  return localStorage.getItem(USER_ROLE);
};

export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const clearRole = () => {
  localStorage.removeItem(USER_ROLE);
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const checkAuthStatus = async () => {
  return await verifyToken();
};