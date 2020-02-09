import * as Yup from 'yup';
import CEICrawler from '../services/CEICrawler';
import Cache from '../../lib/cache';

class CeiImportController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.number().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (!(await CEICrawler(req))) {
      return res.status(401).json({ error: 'CEI site is unstable.' });
    }

    await Cache.delete(`stocks:${req.userId}`);
    return res.json({ ok: true });
  }
}

export default new CeiImportController();
