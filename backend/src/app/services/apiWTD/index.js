import axios from 'axios';

const api = axios.create({
  baseURL: `https://api.worldtradingdata.com/api/v1/stock?api_token=${process.env.APIWTD_KEY}`,
});

export default api;
