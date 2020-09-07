import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://api-boff.ml',
  baseURL: 'http://localhost:3333',
});

export default api;
