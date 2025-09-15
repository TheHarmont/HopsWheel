import { createInstance } from '../services/auth.service';

const API_URL = 'http://localhost:8000/api/Wheel';

const wheelService = {
    getAvailablePrizes: async () => {
        const axios = createInstance(API_URL);
        const response = await axios.get(`/GetAvailablePrizes`);
        return response.data;
    },

    performSpin: async (id) => {
        const axios = createInstance(API_URL);
        const response = await axios.get(`/PerformSpin`, {
            params: { UserId: id },
        });
        return response.data;
    },

    WinConfirm: async () => {
        const axios = createInstance(API_URL);
        const response = await axios.get(`/WinConfirm`, {
            params: { SpinId: id },
        });
        return response.data;
    },
};

export default wheelService;