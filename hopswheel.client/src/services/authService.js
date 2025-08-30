import axios from 'axios';

const API_URL = 'https://localhost:8001/api/Auth';
const ROLE_KEY = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

const login = async (username, password) => {
    try {
        
        const response = await axios.post(`${API_URL}/Login`, { username, password });
        const token = response.data;

        if (token) {
            localStorage.setItem('jwtToken', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('jwtToken');
    delete axios.defaults.headers.common['Authorization'];
};

const getCurrentUser = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        return {
            roles: payload[ROLE_KEY], // поддержка строк и массива
            username: payload.name || payload.sub,
        };
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
};

export default {
    login,
    logout,
    getCurrentUser,
};