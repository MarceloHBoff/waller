import request from 'supertest';

import app from '../../src/app';
import factory from '../util/factories';
import login from '../util/login';
import truncate from '../util/truncate';

describe('Active', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create register the Active and list in database', async () => {
    const token = await login();

    const active = await factory.attrs('UserActive');
    active.type = 'Stock';

    await request(app)
      .post('/actives')
      .set('Authorization', `Bearer ${token}`)
      .send(active);

    const response = await request(app)
      .get('/actives')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.body[0]).toHaveProperty('id');
  });
});
