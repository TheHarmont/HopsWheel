import axios from '../utils/api-client';
import { getToken, setToken, removeToken } from '../utils/storage'

const ROLE_KEY = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;

    // Проверка срока действия токена
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 > Date.now();
    } catch (e) {
        return false;
    }
};

const login = (username, password) => {
    return axios.post('/api/auth/login', { username, password }).then((response) => {
        const token = response.data;
        setToken(token);
        return response.data;
    });
};


const logout = () => {
    removeToken();
};

const getCurrentUser = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        return {
            id: payload.sub,
            roles: payload[ROLE_KEY], // поддержка строк и массива
            username: payload.name || payload.sub,
        };
    } catch (error) {
        console.error('Неверный токен авторизации', error);
        return null;
    }
};

export {
    login,
    logout,
    isAuthenticated,
    getCurrentUser
};