import { createInstance } from '../services/auth.service';

const API_URL = 'https://localhost:8001/api/User'; 

const axios = createInstance(API_URL);

const userService = {
    getAll: async () => {
        const response = await axios.get(`/GetAll`);
        return response.data;
    },

    getById: async (id) => {
        const response = await axios.get(`/GetById`, {
            params: { Id: id },
        });
        return response.data;
    },

    create: async (userData) => {
        await axios.post(`/Create`, userData);
    },

    update: async (userData) => {
        await axios.put(`/Update`, userData);
    },
};

export default userService;