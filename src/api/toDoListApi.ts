import axiosInstance from "../config/axiosConfig";

const apiUrl = import.meta.env.VITE_API_BASE_URL.concat("/todos/");

const toDoListApi = {

    getAllToDoLists: async (params: any) => {
        try {
            const url = params ? `${apiUrl}?${params}` : apiUrl;
            const response = await axiosInstance.get(url);
            return response.data;
        }
        catch (error: any) {
            console.error('Error fetching products:', error);
            return null; 
        }
    },

    createToDo: async (payload: any) => {
        try {
            const url = apiUrl;
            const response = await axiosInstance.post(url, payload);
            return response.data;
        }
        catch (error: any) {
            console.error('Error fetching products:', error);
            return null; 
        }
    },

    deleteToDo: async (id: number) => {
        try {
            const url = `${apiUrl}/${id}`;
            const response = await axiosInstance.delete(url);
            return response.data;
        }
        catch (error: any) {
            console.error('Error fetching products:', error);
            return null; 
        }
    }
}

export default toDoListApi;
