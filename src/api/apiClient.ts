import axios from 'axios';
import { BASE_URL } from './urlConfig';
import { store } from '../store/store';
import { logout } from '../features/auth/slices/authSlice';

const apiClient = axios.create({
  baseURL: BASE_URL,
  // if the API doesn't respond in 2 seconds, Axios will cancel the request.
  // This will trigger the rejected state in slices
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  const token = store.getState().authUser.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);

export default apiClient;
