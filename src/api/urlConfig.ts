import { Platform } from 'react-native';
const BASE_URL_IOS = 'http://localhost:3000';
const BASE_URL_ANDROID = 'http://10.0.2.2:3000';

export const BASE_URL = Platform.OS === 'ios' ? BASE_URL_IOS : BASE_URL_ANDROID;

export const ENDPOINTS = {
  RESTAURANT: '/restaurants',
  CATEGORIES: '/categories',
};
