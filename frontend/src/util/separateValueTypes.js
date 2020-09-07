import { toast } from 'react-toastify';

import api from '~/services/api';
import { activeFilter } from '~/util/array';

export default async function separateValueTypes(filter) {
  try {
    const response1 = await api.get('/actives');
    const response2 = await api.get('/actives/bonds');

    const actives = [...response1.data, ...response2.data];

    let investment = 0;
    let fii = 0;
    let etf = 0;
    let stock = 0;
    let bond = 0;

    activeFilter(actives, filter).forEach(s => {
      switch (s.Active.type) {
        case 'FII':
          fii += s.Active.price * s.amount;
          investment += s.value * s.amount;
          break;
        case 'ETF':
          etf += s.Active.price * s.amount;
          investment += s.value * s.amount;
          break;
        case 'Stock':
          stock += s.Active.price * s.amount;
          investment += s.value * s.amount;
          break;
        case 'Bond':
          bond += s.nowValue * s.amount;
          investment += s.value * s.amount;
          break;
        default:
          break;
      }
    });

    return { actives, data: { investment, fii, etf, stock, bond } };
  } catch (err) {
    toast.error(err.message);
    return {
      actives: [],
      data: { investment: 0, fii: 0, etf: 0, stock: 0, bond: 0 },
    };
  }
}
