import axios from 'axios';
import { BASE_URL } from './urlConfig';

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

export default apiClient;
