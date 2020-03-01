import { Alert } from 'react-native';

import api from '~/services/api';

export default async function separateValueTypes() {
  try {
    const responseStocks = await api.get('/stocks');
    const responseBonds = await api.get('/bonds');

    let investment = 0;
    let stock = 0;
    let fii = 0;
    let bond = 0;
    let etf = 0;

    responseStocks.data.forEach(s => {
      investment += s.averagePrice * s.amount;

      switch (s.Stock.type) {
        case 'FII':
          fii += s.Stock.price * s.amount;
          break;
        case 'ETF':
          etf += s.Stock.price * s.amount;
          break;
        case 'Stock':
          stock += s.Stock.price * s.amount;
          break;
        default:
          break;
      }
    });

    responseBonds.data.forEach(b => {
      investment += b.value;
      bond += b.nowValue;
    });

    return {
      bonds: responseBonds.data,
      stocks: responseStocks.data,
      stock,
      fii,
      etf,
      bond,
      investment,
    };
  } catch (err) {
    Alert.alert('Connection error');
    return false;
  }
}
