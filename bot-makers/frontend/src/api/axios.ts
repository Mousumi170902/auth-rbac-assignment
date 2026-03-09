import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// Auth endpoints
export const loginApi = (email: string, password: string) =>
  api.post('/api/auth/login', { email, password });

export const registerApi = (name: string, email: string, password: string, role: string) =>
  api.post('/api/auth/register', { name, email, password, role });

// Content endpoints
export const getPublicContent = () => api.get('/api/public/content');
export const getUserContent = () => api.get('/api/user/content');
export const getAdminContent = () => api.get('/api/admin/content');
