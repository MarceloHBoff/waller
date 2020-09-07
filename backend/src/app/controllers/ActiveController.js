import { Op } from 'sequelize';

import Active from '../models/Active';
import UserActive from '../models/UserActive';

import Cache from '../../lib/cache';
import { getActive, yahoo } from '../services/activeUtils';

export default {
  async index(req, res) {
    // const cached = await Cache.get(`actives:${req.userId}`);

    const { refresh = false } = req.query;

    // if (!refresh && cached) return res.json(cached);

    if (refresh) {
      const userActives = await UserActive.findAll({
        where: { userId: req.userId },
        include: [
          {
            model: Active,
            where: {
              type: { [Op.ne]: 'Bond' },
            },
          },
        ],
        raw: true,
      });

      let activeOnly = [];

      userActives.forEach(ua => activeOnly.push(ua['Active.code']));

      activeOnly = activeOnly.filter((el, i, arr) => i === arr.indexOf(el));

      for (let i = 0; i < activeOnly.length; i++) {
        const code = activeOnly[i];

        const activeResponse = await yahoo(code);

        const active = await Active.findOne({ where: { code } });

        const data = active.dataValues;
        data.price = activeResponse.regularMarketPrice;
        data.lastPrice = activeResponse.regularMarketPreviousClose;

        await Active.update(data, { where: { code } });
      }
    }

    const activeUpdated = await UserActive.findAll({
      where: { userId: req.userId },
      attributes: ['id', 'userId', 'activeId', 'amount', 'buyDate', 'value'],
      include: [
        {
          model: Active,
          where: {
            type: { [Op.ne]: 'Bond' },
          },
          attributes: ['code', 'name', 'type', 'price', 'lastPrice'],
        },
      ],
    });

    const activeSum = [];
    const actives = [];

    activeUpdated.forEach(ua => {
      const index = ua.activeId - 1;
      if (activeSum[index] === undefined) activeSum[index] = ua;
      else {
        const value =
          ua.amount * ua.value +
          activeSum[index].amount * activeSum[index].value;

        activeSum[index].amount += ua.amount;
        activeSum[index].value = value / activeSum[index].amount;
      }
    });

    activeSum.forEach(i => actives.push(i));

    // await Cache.set(`actives:${req.userId}`, actives);

    return res.json(actives);
  },

  async store(req, res) {
    const { code, amount, value, type, buyDate } = req.body;
    const active = await getActive(code, type);

    const userActive = await UserActive.findOrCreate({
      where: {
        userId: req.userId,
        activeId: active.id,
        amount,
        value,
        buyDate,
      },
    });

    const data = userActive[0].dataValues;

    await Cache.delete(`actives:${req.userId}`);

    return res.status(201).json({ Active: active.dataValues, ...data });
  },
};
