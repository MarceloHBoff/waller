import { subMonths, lastDayOfMonth, getYear, getMonth } from 'date-fns';
import { Op } from 'sequelize';

import Active from '../models/Active';
import Dividend from '../models/Dividend';
import UserActive from '../models/UserActive';

// import Cache from '../../lib/cache';
import monthsName from '../../util/monthsName';

export default {
  async index(req, res) {
    // const cached = await Cache.get(`dividends:index:${req.userId}`);

    // if (cached) return res.json(cached);

    const dividendsMonths = [];

    const actives = await UserActive.findAll({
      where: {
        userId: req.userId,
      },
      include: [
        {
          model: Active,
          where: {
            type: { [Op.ne]: 'Bond' },
          },
        },
      ],
    });

    for (let months = 12; months >= 0; months--) {
      const finalDate =
        months === 0
          ? new Date()
          : lastDayOfMonth(subMonths(new Date(), months));

      const iniDate = new Date(getYear(finalDate), getMonth(finalDate), 1);

      const dividends = [];

      for (let i = 0; i < actives.length; i++) {
        const dividend = await Dividend.findAll({
          where: {
            activeId: actives[i].activeId,
            EXDate: {
              [Op.gte]: actives[i].buyDate,
            },
            payDate: {
              [Op.and]: {
                [Op.gte]: iniDate,
                [Op.lte]: finalDate,
              },
            },
          },
        });

        if (dividend.length !== 0) {
          dividends.push({ dividend, userActive: actives[i] });
        }
      }

      const monthIndex = getMonth(iniDate);

      dividendsMonths.push({
        month: `${monthsName[monthIndex]}/${getYear(iniDate)}`,
        dividends,
      });
    }

    // await Cache.set(`dividends:index:${req.userId}`, dividendsMonths);

    return res.json(dividendsMonths);
  },

  async show(req, res) {
    // const cached = await Cache.get(
    //   `dividends:${req.params.type}:${req.userId}`
    // );

    // if (cached) return res.json(cached);

    const dividends = [];

    const actives = await UserActive.findAll({
      where: {
        userId: req.userId,
      },
      include: [
        {
          model: Active,
          where: {
            type: { [Op.ne]: 'Bond' },
          },
        },
      ],
    });

    let payDate = {};

    if (req.params.type === 'all') payDate = { [Op.lte]: new Date() };
    if (req.params.type === 'new') payDate = { [Op.gt]: new Date() };

    for (let i = 0; i < actives.length; i++) {
      const dividend = await Dividend.findAll({
        where: {
          activeId: actives[i].activeId,
          EXDate: {
            [Op.gte]: actives[i].buyDate,
          },
          payDate,
        },
      });

      if (dividend.length !== 0) {
        dividends.push({ dividend, userActive: actives[i] });
      }
    }

    // await Cache.set(`dividends:${req.params.type}:${req.userId}`, dividends);

    return res.json(dividends);
  },
};
