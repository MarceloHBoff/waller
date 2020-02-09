import * as Yup from 'yup';

import yahooFinance from 'yahoo-finance';

import Stock from '../models/Stock';
import UserStock from '../models/UserStock';

import Cache from '../../lib/cache';

import apiWTD from '../services/apiWTD';
import getStock from '../services/getStock';

async function yahoo(symbol) {
  const data = await yahooFinance.quote({
    symbol,
    modules: ['price'],
  });

  return data.price;
}

async function updateStock(userStocks, sizeStocks, symbols) {
  try {
    const stocksAPI = await apiWTD.get('', {
      params: {
        symbol: symbols,
      },
    });

    for (let j = 0; j < stocksAPI.data.data.length; j++) {
      const apiStock = stocksAPI.data.data[j];
      let index = 0;

      for (index = 0; index < sizeStocks; index++) {
        if (
          `${userStocks[index].Stock.dataValues.code}.SA` === apiStock.symbol
        ) {
          break;
        }
      }

      const stock = await Stock.findByPk(userStocks[index].dataValues.stockId);

      const data = stock.dataValues;
      data.price = Number(apiStock.price);
      data.lastPrice = Number(apiStock.close_yesterday);

      await Stock.update(data, {
        where: { id: userStocks[index].dataValues.stockId },
      });
    }
  } catch (err) {
    const symbol = symbols.split(',');

    for (let index = 0; index < symbol.length - 1; index++) {
      const dataStock = await yahoo(symbol[index]);

      const code = symbol[index].replace('.SA', '');

      const stock = await Stock.findOne({ where: { code } });

      const data = stock.dataValues;
      data.price = dataStock.regularMarketPrice;
      data.lastPrice = dataStock.regularMarketPreviousClose;

      await Stock.update(data, { where: { code } });
    }
  }
}

class StockController {
  async index(req, res) {
    const cached = await Cache.get(`stocks:${req.userId}`);
    const { refresh } = req.query;

    if (refresh !== 'true' && cached) return res.json(cached);

    const userStocks = await UserStock.findAll({
      where: { userId: req.userId },
      include: [Stock],
    });

    let symbols = '';
    let i = 0;
    const sizeStocks = userStocks.length;

    while (i < sizeStocks) {
      symbols += `${userStocks[i].Stock.dataValues.code}.SA,`;
      i++;

      if (i % 5 === 0 && i !== 0) {
        await updateStock(userStocks, sizeStocks, symbols);
        symbols = '';
      }
    }

    if (symbols !== '') {
      await updateStock(userStocks, sizeStocks, symbols);
    }

    await Cache.set(`stocks:${req.userId}`, userStocks);

    return res.json(userStocks);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      code: Yup.string().required(),
      amount: Yup.number().required(),
      averagePrice: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const stock = await getStock(req.body.code);

    const userStock = await UserStock.create({
      userId: req.userId,
      stockId: stock.id,
      amount: req.body.amount,
      averagePrice: req.body.averagePrice,
    });

    await Cache.delete(`stocks:${req.userId}`);

    return res
      .status(201)
      .json({ ...stock.dataValues, ...userStock.dataValues });
  }
}

export default new StockController();
