import { createInstance } from '../services/auth.service';

const API_URL = 'https://localhost:8001/api/Prize';

const prizeService = {
    getAll: async () => {
        const axios = createInstance(API_URL);
        const response = await axios.get(`/GetAll`);
        return response.data;
    },

    getById: async (id) => {
        const axios = createInstance(API_URL);
        const response = await axios.get(`/GetById`, {
            params: { Id: id },
        });
        return response.data;
    },

    create: async (userData) => {
        const axios = createInstance(API_URL);
        await axios.post(`/Create`, userData);
    },

    update: async (userData) => {
        const axios = createInstance(API_URL);
        await axios.put(`/Update`, userData);
    },

    delete: async (id) => {
        const axios = createInstance(API_URL);
        await axios.delete(`/Delete`, {
            params: { Id: id },
        });
    }
};

export default prizeService;