import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import Bond from '../models/Bond';

class BondController {
  async index(req, res) {
    const bonds = await Bond.findAll({
      where: { userId: req.userId },
    });

    return res.json(bonds);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      value: Yup.number().required(),
      dueDate: Yup.date().required(),
      nowValue: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let bond = await Bond.findOne({
      where: {
        userId: req.userId,
        title: req.body.title,
      },
    });

    if (!bond) {
      const data = {
        ...req.body,
        userId: req.userId,
        dueDate: parseISO(req.body.dueDate),
        nowRentability: (req.body.nowValue / req.body.value - 1) * 100,
      };

      bond = await Bond.create(data);
    }

    return res.json(bond);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      value: Yup.number().required(),
      dueDate: Yup.date().required(),
      nowValue: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const bond = await Bond.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });

    if (!bond) {
      return res.status(400).json({ error: 'Bond does not exist' });
    }

    bond.update(req.body);

    return res.json(bond);
  }

  async delete(req, res) {
    const bond = await Bond.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });

    if (!bond) {
      return res.status(400).json({ error: 'Bond does not exist' });
    }

    bond.destroy();

    return res.json({});
  }
}

export default new BondController();
