import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://52.67.47.238/',
  baseURL: 'http://localhost:3333/',
});

export default api;
