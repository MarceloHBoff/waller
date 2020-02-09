import yahooFinance from 'yahoo-finance';
import Stock from '../../models/Stock';

import apiWTD from '../apiWTD';
import apiAlpha from '../apiAlpha';

export default async function getStock(code) {
  let stockBase = await Stock.findOne({ where: { code } });
  let name = '';

  if (!stockBase) {
    if (code.substring(4, 6) === '11') {
      try {
        const response = await apiAlpha.get('', {
          params: {
            keywords: `${code}.SA`,
          },
        });
        name = response.data.bestMatches[0]['2. name'];
      } catch (err) {
        name = '';
      }
    }

    try {
      const stockData = await apiWTD.get('', {
        params: {
          symbol: `${code}.SA`,
        },
      });

      if (stockData.data.data[0].market_cap !== 'N/A') {
        name = '';
      }

      stockBase = await Stock.create({
        code: code.toUpperCase(),
        type: stockData.data.data[0].market_cap === 'N/A' ? 'FII' : 'Stock',
        name: name || stockData.data.data[0].name,
        price: stockData.data.data[0].price,
        lastPrice: stockData.data.data[0].close_yesterday,
      });
    } catch (err) {
      const { price } = await yahooFinance.quote({
        symbol: `${code}.SA`,
        modules: ['price'],
      });

      stockBase = await Stock.create({
        code: code.toUpperCase(),
        type: price.shortName.substring(0, 3) === 'FII' ? 'FII' : 'Stock',
        name: price.longName || price.shortName,
        price: price.regularMarketPrice,
        lastPrice: price.regularMarketPreviousClose,
      });
    }
  }

  return stockBase;
}
