import authService from '../services/authService';

export const isAdmin = () => {
  const user = authService.getCurrentUser();
  return user?.roles?.includes('admin');
};

export const isBarmen = () => {
  const user = authService.getCurrentUser();
  return user?.roles?.includes('barmen');
};

export const hasRole = (roles) => {
  const user = authService.getCurrentUser();
  return roles.includes(user.roles);
};

export const isAuthenticated = () => {
  return !!authService.getCurrentUser();
};