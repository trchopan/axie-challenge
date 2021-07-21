import axios, {AxiosRequestConfig} from 'axios';
import {auth} from './firebase';

const authMiddleware = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  if (!auth.currentUser) return config;
  const token = await auth.currentUser.getIdToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

export const api = axios.create({
  baseURL: import.meta.env.DEV
    ? 'http://localhost:5001/hermes-7b876/us-central1/api'
    : 'https://us-central1-hermes-7b876.cloudfunctions.net/api',
});

api.interceptors.request.use(authMiddleware);
