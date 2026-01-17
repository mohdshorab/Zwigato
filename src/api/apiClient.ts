import axios from 'axios';
import { BASE_URL } from './urlConfig';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application.json',
    Accept: 'application/json',
  },
});

export default apiClient;