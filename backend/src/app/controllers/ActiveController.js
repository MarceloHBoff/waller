import { Op } from 'sequelize';

import Active from '../models/Active';
import UserActive from '../models/UserActive';

import Cache from '../../lib/cache';
import { getActive, updateActive } from '../services/activeUtils';

export default {
  async index(req, res) {
    const cached = await Cache.get(`actives:${req.userId}`);

    const { refresh } = req.query;

    if (!refresh && cached) return res.json(cached);

    const userActives = await UserActive.findAll({
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

    userActives.forEach((ua) => {
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

    activeSum.forEach((i) => actives.push(i));

    let symbols = '';
    let i = 0;
    const size = actives.length;

    while (i < size) {
      symbols += `${actives[i].Active.dataValues.code}.SA,`;
      i++;

      if (i % 5 === 0 && i !== 0) {
        await updateActive(actives, size, symbols);
        symbols = '';
      }
    }

    if (symbols !== '') {
      await updateActive(actives, size, symbols);
    }

    await Cache.set(`actives:${req.userId}`, actives);

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
      include: [
        {
          model: Active,
          attributes: ['code', 'name', 'type', 'price', 'lastPrice'],
        },
      ],
    });

    return res.status(201).json(userActive[0]);
  },
};
