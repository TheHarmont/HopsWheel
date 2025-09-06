import { createInstance } from '../services/auth.service';

const API_URL = 'https://localhost:8001/api/Wheel';

const wheelService = {
    getPrizes: async () => {
        const axios = createInstance(API_URL);
        const response = await axios.get(`/GetPrizes`);
        return response.data;
    },

    getPrize: async () => {
        const axios = createInstance(API_URL);
        const response = await axios.get(`/GetPrize`);
        return response.data;
    },
};

export default wheelService;