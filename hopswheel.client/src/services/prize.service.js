import axios from '../utils/api-client';

const prizeService = {
    getAll: async () => {
        const response = await axios.get(`api/prize/get-all`);
        return response.data;
    },

    getById: async (id) => {
        const response = await axios.get(`api/prize/get-by-id`, {
            params: { Id: id },
        });
        return response.data;
    },

    create: async (userData) => {
        await axios.post(`api/prize/create`, userData);
    },

    update: async (userData) => {
        await axios.put(`api/prize/update`, userData);
    },

    delete: async (id) => {
        await axios.delete(`api/prize/delete`, {
            params: { Id: id },
        });
    }
};

export default prizeService;