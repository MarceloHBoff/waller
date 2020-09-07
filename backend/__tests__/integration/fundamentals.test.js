import request from 'supertest';

import app from '../../src/app';
import { getActive } from '../../src/app/services/activeUtils';
import login from '../util/login';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to get and list fundamentals by Stock', async () => {
    const token = await login();
    const stock = 'ITUB3';

    await getActive(stock);

    await request(app)
      .post('/fundamentals')
      .set('Authorization', `Bearer ${token}`)
      .send();

    const response = await request(app)
      .get(`/fundamentals?code=${stock}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.body.active.code).toBe(stock);
  });
});
