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
            console.error('Error fetching todos:', error);
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
            console.error('Error creating todo:', error);
            return null; 
        }
    },

    deleteToDo: async (id: number) => {
        try {
            const url = `${apiUrl}${id}/`;
            const response = await axiosInstance.delete(url);
            return response.data;
        }
        catch (error: any) {
            console.error('Error deleting todo:', error);
            return null; 
        }
    },

    viewToDo: async (id: number) => {
        try {
            const url = `${apiUrl}${id}/`;
            const response = await axiosInstance.get(url);
            return response.data;
        }
        catch (error: any) {
            console.error('Error viewing todo:', error);
            return null; 
        }
    },

    updateTodo: async (id: number, payload: any) => {
        try {
            const url = `${apiUrl}${id}/`;
            const response = await axiosInstance.patch(url, payload); // Use PATCH method for partial updates
            return response.data;
        }
        catch (error: any) {
            console.error('Error updating todo:', error);
            return null; 
        }
    }
};

export default toDoListApi;
