import { Platform } from 'react-native';

export const BASE_URL =
  Platform.OS == 'ios'
    ? 'http://localhost:3000'
    : Platform.OS === 'android'
    ? 'http://10.0.2.2:3000'
    : '';

export const ENDPOINTS = {
  RESTAURANT: '/restaurants',
  CATEGORIES: '/categories',
};
