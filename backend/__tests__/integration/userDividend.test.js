import request from 'supertest';

import app from '../../src/app';
import factory from '../util/factories';
import login from '../util/login';
import truncate from '../util/truncate';

async function createData() {
  const token = await login();

  const active = await factory.attrs('UserActive');
  active.type = 'Stock';
  active.buyDate = new Date(2019, 1, 1);

  await request(app)
    .post('/actives')
    .set('Authorization', `Bearer ${token}`)
    .send(active);

  await request(app)
    .post('/dividend')
    .set('Authorization', `Bearer ${token}`)
    .send({
      code: active.code,
      type: 'Stock',
    });

  return token;
}

describe('Active', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to list dividends accumulated by month', async () => {
    const token = await createData();

    const response = await request(app)
      .get('/dividends')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.body[0]).toHaveProperty('month');
    expect(response.body[0]).toHaveProperty('dividends');
  });

  it('should be able to list all user dividends', async () => {
    const token = await createData();

    const response = await request(app)
      .get('/dividends/all')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.body[0]).toHaveProperty('dividend');
  });

  it('should be able to list new user dividends', async () => {
    const token = await createData();

    const response = await request(app)
      .get('/dividends/new')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(200);
  });
});
