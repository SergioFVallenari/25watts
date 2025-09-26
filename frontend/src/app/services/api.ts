// src/services/api.ts
import axios from 'axios';
import config from './config';
import { store } from '../redux/store';
import { Loading } from 'notiflix';
const api = axios.create({
  baseURL: config.backendUrl,
  headers: {'Content-Type': 'application/json'},
});
api.interceptors.request.use((request) => {
  Loading.circle();
  const state = store.getState();
  const token = state.usuario.token;
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
  return request;
});
api.interceptors.response.use((response) => {
  Loading.remove();
  return response;
}, (error) => {
  Loading.remove();
  return Promise.reject(error);
});
export default api;
