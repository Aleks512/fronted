import axios from 'axios';
import { store } from './store';

const getAPI = axios.create({
  baseURL: 'http://localhost:8000', // Ajustez selon l'URL de base de votre API
  timeout: 5000
});

// In this setup, the axios interceptor checks sessionStorage directly to retrieve the accessToken. 
//This method is effective in ensuring that even after page refreshes, 
// the latest token is always used since sessionStorage is immediately updated when tokens are set or refreshed.
getAPI.interceptors.response.use(
  response => response,
  async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
              await store.dispatch('auth/refreshToken');
              return getAPI(originalRequest);
          } catch (refreshError) {
              return Promise.reject(refreshError);
          }
      }
      return Promise.reject(error);
  }
);


export default getAPI;
