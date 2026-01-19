import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
};

// Tracking API
export const trackingAPI = {
  getAll: (params = {}) =>
    apiClient.get('/trackings', { params }),
  
  create: (data) =>
    apiClient.post('/trackings', data),
  
  update: (id, data) =>
    apiClient.put(`/trackings/${id}`, data),
  
  vote: (id, rating) =>
    apiClient.post(`/trackings/${id}/vote`, { rating }),
};

// Chart API
export const chartAPI = {
  getSummary: () =>
    apiClient.get('/chart/summary'),
};

export default apiClient;
