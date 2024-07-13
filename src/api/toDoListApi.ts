import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL.concat("/todos");

const toDoListApi = {

    getAllToDoLists: async (params: any) => {
        try {
            const url = params ? `${apiUrl}?${params}` : apiUrl;
            const response = await axios.get(url);
            return response.data;
        }
        catch (error: any) {
            console.error('Error fetching products:', error);
            throw error; 
        }
    }
}

export default toDoListApi;
