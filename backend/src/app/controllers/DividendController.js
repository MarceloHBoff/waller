import Active from '../models/Active';
import Dividend from '../models/Dividend';

import { getActive } from '../services/activeUtils';
import { getDividends, getDividendsFII } from '../services/getDividends';

export default {
  async index(req, res) {
    const active = await getActive(req.query.code);

    if (!active) return res.status(400).json({ error: 'Code does not exists' });

    const dividends = await Dividend.findAll({
      where: {
        activeId: active.id,
      },
    });

    return res.json(dividends);
  },

  async store(req, res) {
    if (req.body.type === 'Stock') {
      await getDividends(req.body.code);
    } else {
      await getDividendsFII([{ code: req.body.code }]);
    }

    return res.json({ ok: true });
  },

  async create(req, res) {
    const actives = await Active.findAll({
      where: {
        type: 'Stock',
      },
    });

    for (let i = 0; i < actives.length; i++) {
      await getDividends(actives[i].code);
    }

    const fiis = await Active.findAll({
      where: {
        type: 'FII',
      },
    });

    await getDividendsFII(fiis);

    return res.json({ ok: true });
  },
};
