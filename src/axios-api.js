import axios from 'axios';
import { store } from './store';

const getAPI = axios.create({
  baseURL: 'http://localhost:8000', // Ajustez selon l'URL de base de votre API
  timeout: 5000
});

getAPI.interceptors.request.use(function (config) {
  const token = store.state.auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default getAPI;
