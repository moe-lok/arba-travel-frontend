import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// This interceptor should not be used for login requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && !config.url.endsWith('login/')) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;