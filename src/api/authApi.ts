import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const authApi = {

    login: async (payload: any) => {
        try {
            const url = `${apiUrl}/login/`;
            const response = await axios.post(url, payload);
            return response.data;
        }
        catch (error: any) {
            console.error('Error fetching products:', error);
            return null;
        }
    },
    register: async (payload: any) => {
        try {
            const url = `${apiUrl}/register/`;
            const response = await axios.post(url, payload);
            return response.data;
        }
        catch (error: any) {
            console.error('Error fetching products:', error);
            return null;
        }
    },
    refreshToken: async (payload: any) => {
        console.log(">> ", payload);
        try {
            const url = `${apiUrl}/token/refresh/`;
            const response = await axios.post(url, payload);
            return response.data;
        }
        catch (error: any) {
            console.error('Error fetching products:', error);
            return null;
        }
    },
}

export default authApi;