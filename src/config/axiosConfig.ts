import axios from 'axios';
import authApi from '../api/authApi';

const axiosInstance = axios.create();

const getAccessToken = () => localStorage.getItem('access_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');

const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};

const refreshToken = async () => {
  const refreshToken = getRefreshToken();
  try {
    const response = await authApi.refreshToken({ refresh: refreshToken });
    const { access_token, refresh_token } = response;
    setTokens(access_token, refresh_token);
    return access_token;
  } 
  catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

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
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } 
      catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
