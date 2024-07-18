import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const axiosInstance = axios.create();

const getAccessToken = () => localStorage.getItem('access_token');

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
      const { status } = error.response;
      if (status === 401) {
          const auth = useAuth();
          auth.logout();
      }
      return Promise.reject(error);
  }
);


export default axiosInstance;