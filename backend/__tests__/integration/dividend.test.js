import request from 'supertest';

import Dividend from '../../src/app/models/Dividend';

import app from '../../src/app';
import { getActive } from '../../src/app/services/activeUtils';
import login from '../util/login';
import truncate from '../util/truncate';

describe('Active', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to search in web an list Stock dividends', async () => {
    const token = await login();

    await request(app)
      .post('/dividend')
      .set('Authorization', `Bearer ${token}`)
      .send({
        code: 'ITUB3',
        type: 'Stock',
      });

    const response = await request(app)
      .get('/dividend?code=ITUB3')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('value');
  });

  it('should be able to search in web an list FII dividends', async () => {
    const token = await login();

    await request(app)
      .post('/dividend')
      .set('Authorization', `Bearer ${token}`)
      .send({
        code: 'KNRI11',
        type: 'FII',
      });

    const response = await request(app)
      .get('/dividend?code=KNRI11')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('value');
  });

  it('should be able to search in web an list Stock Unit dividends', async () => {
    const token = await login();

    await request(app)
      .post('/dividend')
      .set('Authorization', `Bearer ${token}`)
      .send({
        code: 'KLBN11',
        type: 'Stock',
      });

    const response = await request(app)
      .get('/dividend?code=KLBN11')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('value');
  });

  it('should not be able to list Active invalid', async () => {
    const token = await login();

    const response = await request(app)
      .get('/dividend?code=ITUB1')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
  });

  it('should be able to create all dividens in database', async () => {
    const token = await login();

    await getActive('ITUB3');
    await getActive('KNRI11');

    await request(app)
      .patch('/dividend')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    const response = await Dividend.findAll();

    expect(response[0].dataValues).toHaveProperty('id');
    expect(response[0].dataValues).toHaveProperty('value');
  });
});
