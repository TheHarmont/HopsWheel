import axios from '../utils/api-client';

const userService = {
    getAllRoles: async () => {
        const response = await axios.get(`api/user/get-all-roles`);
        return response.data;
    },

    getAll: async () => {
        const response = await axios.get(`api/user/get-all`);
        return response.data;
    },

    getById: async (id) => {
        const response = await axios.get(`api/user/get-by-id`, {
            params: { Id: id },
        });
        return response.data;
    },

    create: async (userData) => {
        await axios.post(`api/user/create`, userData);
    },

    update: async (userData) => {
        await axios.put(`api/user/update`, userData);
    },
};

export default userService;