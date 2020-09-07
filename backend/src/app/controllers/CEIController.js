import Cache from '../../lib/cache';
import CEICrawler from '../services/CEICrawler';

export default {
  async store(req, res) {
    req.setTimeout(3000000);

    if (!(await CEICrawler(req))) {
      return res.status(401).json({ error: 'CEI site is unstable.' });
    }

    await Cache.delete(`actives:${req.userId}`);
    return res.json({ ok: true });
  },
};
