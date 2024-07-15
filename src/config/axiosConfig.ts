import axios from 'axios';

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

export default axiosInstance;