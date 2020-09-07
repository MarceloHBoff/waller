import yahooFinance from 'yahoo-finance';

import Active from '../../models/Active';

import apiWTD from '../apiWTD';

async function yahoo(symbol) {
  const data = await yahooFinance.quote({
    symbol,
    modules: ['price'],
  });

  return data.price;
}

export async function getActive(code, ActiveType) {
  let active = await Active.findOne({ where: { code } });

  if (!active) {
    try {
      const data = await yahoo(`${code}.SA`);

      let type = ActiveType;

      if (!type) {
        if (data.shortName.substring(0, 3) === 'FII') type = 'FII';
        if (data.longName && data.longName.search('ETF') !== -1) type = 'ETF';
        if (!type) type = 'Stock';
      }

      active = await Active.create({
        code: code.toUpperCase(),
        type,
        name: data.longName || data.shortName,
        price: data.regularMarketPrice,
        lastPrice: data.regularMarketPreviousClose,
      });
    } catch (err) {
      active = null;
    }
  }

  return active;
}

export async function updateActive(userActive, size, symbols) {
  try {
    const activeResponse = await apiWTD.get('', {
      params: {
        symbol: symbols,
      },
    });

    for (let i = 0; i < activeResponse.data.data.length; i++) {
      const apiActive = activeResponse.data.data[i];
      let index = 0;

      for (index = 0; index < size; index++) {
        if (
          `${userActive[index].Active.dataValues.code}.SA` === apiActive.symbol
        ) {
          break;
        }
      }

      const active = await Active.findByPk(
        userActive[index].dataValues.activeId
      );

      const data = active.dataValues;
      data.price = Number(apiActive.price);
      data.lastPrice = Number(apiActive.close_yesterday);

      await Active.update(data, {
        where: { id: userActive[index].dataValues.activeId },
      });
    }
  } catch (err) {
    const symbol = symbols.split(',');

    for (let index = 0; index < symbol.length - 1; index++) {
      const activeResponse = await yahoo(symbol[index]);

      const code = symbol[index].replace('.SA', '');

      const active = await Active.findOne({ where: { code } });

      const data = active.dataValues;
      data.price = activeResponse.regularMarketPrice;
      data.lastPrice = activeResponse.regularMarketPreviousClose;

      await Active.update(data, { where: { code } });
    }
  }
}

export async function getActiveBond(name) {
  const active = await Active.findOrCreate({
    where: { type: 'Bond', code: 'RF', name },
  });

  return active[0];
}
