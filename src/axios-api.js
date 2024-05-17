import axios from 'axios';
import { store } from './store';

const getAPI = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

getAPI.interceptors.request.use(async function (config) {
  const token = sessionStorage.getItem('accessToken');
  const accessTokenExpiresAt = sessionStorage.getItem('accessTokenExpiresAt');
  const now = Date.now();

  // Define public endpoints
  const publicEndpoints = ['/api/recipes/', '/api/categories/'];

  // Check if the request is to a public endpoint
  const isPublicEndpoint = publicEndpoints.some(endpoint => config.url.includes(endpoint));

  if (!isPublicEndpoint) {
    if (token && accessTokenExpiresAt && (now >= parseInt(accessTokenExpiresAt) - (60 * 1000))) {
      if (!isRefreshing) {
        isRefreshing = true;
        store.dispatch('auth/refreshToken').then(newToken => {
          isRefreshing = false;
          processQueue(null, newToken);
        }).catch(error => {
          isRefreshing = false;
          processQueue(error);
        });
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        config.headers['Authorization'] = 'Bearer ' + token;
        return config;
      }).catch(error => {
        return Promise.reject(error);
      });
    }

    config.headers['Authorization'] = 'Bearer ' + token;
  }
  
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default getAPI;
