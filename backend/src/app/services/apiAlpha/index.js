import axios from 'axios';

const api = axios.create({
  baseURL: `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&apikey=
  ${process.env.APIALPHA_KEY}`,
});

export default api;
