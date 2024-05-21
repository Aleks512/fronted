import axios from 'axios';
import { store } from './store';

const getAPI = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
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
  const accessTokenExpiresAt = parseInt(sessionStorage.getItem('accessTokenExpiresAt'), 10);
  const now = Date.now();

  // Define public endpoints
  const publicEndpoints = ['/api/recipes/', '/api/categories/', '/register/', '/login/', '/posts/'];

  // Check if the request is to a public endpoint
  const isPublicEndpoint = publicEndpoints.some(endpoint => config.url.includes(endpoint));

  console.log('Request Interceptor: Checking token expiry and refreshing if necessary');

  if (!isPublicEndpoint && token) {
    console.log(`Token expires at: ${new Date(accessTokenExpiresAt)}`);
    console.log(`Current time: ${new Date(now)}`);

    if (now >= accessTokenExpiresAt - (60 * 1000)) {
      console.log('Token is about to expire or has expired. Attempting to refresh.');

      if (!isRefreshing) {
        isRefreshing = true;
        store.dispatch('auth/refreshToken').then(newToken => {
          console.log('Token refreshed successfully:', newToken); // Log pour débogage
          isRefreshing = false;
          processQueue(null, newToken);
        }).catch(error => {
          console.error('Error refreshing token:', error); // Log pour débogage
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
