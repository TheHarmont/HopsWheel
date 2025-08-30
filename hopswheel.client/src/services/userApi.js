import axios from 'axios';

const API_URL = 'https://localhost:8001/api/User'; 

const userApi = {
    getAll: async () => {
        const response = await axios.get(`${API_URL}/GetAll`);
        return response.data;
    },

    getById: async (id) => {
        const response = await axios.get(`${API_URL}/GetById`, {
            params: { Id: id },
        });
        return response.data;
    },

    create: async (userData) => {
        await axios.post(`${API_URL}/Create`, userData);
    },

    update: async (userData) => {
        await axios.put(`${API_URL}/Update`, userData);
    },
};

export default userApi;