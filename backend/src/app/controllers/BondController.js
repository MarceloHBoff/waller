import Active from '../models/Active';
import UserActive from '../models/UserActive';

import Cache from '../../lib/cache';
import { getActiveBond } from '../services/activeUtils';

export default {
  async index(req, res) {
    const userActives = await UserActive.findAll({
      where: { userId: req.userId },
      include: [
        {
          model: Active,
          attributes: ['name', 'type'],
          where: {
            type: 'Bond',
          },
        },
      ],
    });

    return res.json(userActives);
  },

  async store(req, res) {
    const { name, value, dueDate, nowValue } = req.body;
    const active = await getActiveBond(name);

    const bond = await UserActive.findOrCreate({
      where: {
        userId: req.userId,
        activeId: active.id,
        amount: 1,
        value,
        dueDate,
        nowValue,
      },
      include: [
        {
          model: Active,
          attributes: ['name'],
        },
      ],
    });

    await Cache.delete(`actives:${req.userId}`);

    return res.json(bond[0]);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, value, dueDate, nowValue } = req.body;

    const active = await getActiveBond(name);

    const bond = await UserActive.findOne({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!bond) {
      return res.status(400).json({ error: 'Bond does not exist' });
    }

    bond.update(
      { activeId: active.id, value, dueDate, nowValue },
      {
        include: [
          {
            model: Active,
            attributes: ['name'],
          },
        ],
      }
    );

    await Cache.delete(`actives:${req.userId}`);

    return res.json(bond);
  },

  async delete(req, res) {
    const { id } = req.params;

    const bond = await UserActive.findOne({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!bond) {
      return res.status(400).json({ error: 'Bond does not exist' });
    }

    bond.destroy();

    await Cache.delete(`actives:${req.userId}`);

    return res.json({ ok: true });
  },
};
