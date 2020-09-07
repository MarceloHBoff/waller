import Active from '../models/Active';
import Fundamentals from '../models/Fundamentals';

import Cache from '../../lib/cache';
import stockCrawler from '../services/stockCrawler';

export default {
  async index(req, res) {
    const { code } = req.query;

    // const cached = await Cache.get(`fundamentals:${code}`);

    // if (cached) return res.json(cached);

    const active = await Active.findOne({
      where: { code },
      raw: true,
    });

    const fundamentals = await Fundamentals.findAll({
      where: { code: code.substr(0, 4) },
      order: [['year', 'DESC']],
      raw: true,
    });

    const splited = {
      year: [],
      revenue: ['Revenue'],
      margin: ['Margin'],
      ebitda: ['EBITDA'],
      margin_ebitda: ['Margin EBITDA'],
      financial_result: ['Financial Result'],
      profit: ['Profit'],
    };

    fundamentals.forEach(f => {
      splited.year.push(f.year);
      splited.revenue.push(f.revenue);
      splited.margin.push(f.margin);
      splited.ebitda.push(f.ebitda);
      splited.margin_ebitda.push(f.margin_ebitda);
      splited.financial_result.push(f.financial_result);
      splited.profit.push(f.profit);
    });

    // await Cache.set(`fundamentals:${code}`, { active, splited });

    return res.json({ active, splited });
  },

  async store(req, res) {
    req.setTimeout(1000000);

    const actives = await Active.findAll({ where: { type: 'Stock' } });

    for (let i = 0; i < actives.length; i++) {
      const code = actives[i].code.substr(0, 4);

      const { cnpj, description, sector, ri, ipo } = await stockCrawler(code);

      await actives[i].update({
        cnpj,
        description,
        sector,
        ri,
        ipo,
      });

      await Cache.delete(`fundamentals:${code}`);
    }

    return res.json({ ok: true });
  },
};
