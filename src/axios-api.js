import axios from 'axios';

const getAPI = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000, // Correct spelling of 'timeout'
  headers: {
    'Content-Type': 'application/json',
  },
});

export default getAPI;