import axios from 'axios';
import { getToken, setToken, removeToken } from '../utils/storage'

const API_URL = 'https://localhost:8001/api/Auth';
const ROLE_KEY = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

const axiosAuth = axios.create({
    baseURL: API_URL,
});


const createInstance = (url) => {
    const instance = axios.create({
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Добавляем токен
    const token = getToken();
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        console.error("Не удалось получить токен авторизации");
    }

    return instance;
};

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
    return axiosAuth.post('/login', { username, password }).then((response) => {
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
    getCurrentUser,
    createInstance,
};