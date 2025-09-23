import axios from '../utils/api-client';

const wheelService = {
    getAvailablePrizes: async () => {
        const response = await axios.get(`api/wheel/get-available-prizes`);
        return response.data;
    },

    performSpin: async (id) => {
        const response = await axios.get(`api/wheel/spin`, {
            params: { UserId: id },
        });
        return response.data;
    },

    getSpinHistory : async (takeSpin = 10) => {
        const response = await axios.get(`api/wheel/get-spin-history`, {
            params: { take: takeSpin }
        });
        return response.data;
    },

    winConfirm: async (id) => {
        const response = await axios.post(`api/wheel/win-confirm`, { SpinId: id });
        return response.data;
    },
};

export default wheelService;