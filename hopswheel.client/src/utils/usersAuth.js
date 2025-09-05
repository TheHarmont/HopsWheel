import { getCurrentUser } from '../services/auth.service';

export const hasRole = (roles) => {
  const user = getCurrentUser();
  return roles.includes(user.roles);
};