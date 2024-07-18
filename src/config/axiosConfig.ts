import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const axiosInstance = axios.create();

const getAccessToken = (): string | null => localStorage.getItem('access_token');
const getRefreshToken = (): string | null => localStorage.getItem('refresh_token');
const setAccessToken = (token: string) => localStorage.setItem('access_token', token);
const setRefreshToken = (refresh: string) => localStorage.setItem('refresh_token', refresh);

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();

    if (token) {
      const decodedToken: any = jwtDecode(token);
      const isTokenExpired = decodedToken.exp < Date.now() / 1000;

      if (isTokenExpired) {
        const refreshToken = getRefreshToken();

        if (refreshToken) {
          try {
            const response = await axios.post('/api/token/refresh', { refresh: refreshToken });

            if (response.data.access) {
              setAccessToken(response.data.access);
              setRefreshToken(response.data.refresh);
              token = response.data.access;
            } else {
              // Handle the case where refresh token is invalid or expired
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              // You might want to redirect the user to the login page
              window.location.href = '/login';
            }
          } catch (error) {
            console.error('Error refreshing token', error);
            // Handle error, possibly redirect to login
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
          }
        } else {
          // If there's no refresh token, clear the tokens and redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }

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
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
