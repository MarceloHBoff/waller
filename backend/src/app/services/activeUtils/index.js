import yahooFinance from 'yahoo-finance';

import Active from '../../models/Active';

export async function yahoo(code) {
  const data = await yahooFinance.quote({
    symbol: `${code}.SA`,
    modules: ['price'],
  });

  return data.price;
}

export async function getActive(code, ActiveType) {
  let active = await Active.findOne({ where: { code: code.toUpperCase() } });

  if (active) {
    return active;
  }

  try {
    const data = await yahoo(code);

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

  return active;
}

export async function getActiveBond(name) {
  const active = await Active.findOrCreate({
    where: { type: 'Bond', code: 'RF', name },
  });

  return active[0];
}
