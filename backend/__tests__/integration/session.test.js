import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../util/factories';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to login in aplication', async () => {
    const user = await factory.attrs('User');

    await request(app).post('/users').send(user);

    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  });

  it('should not be able to login in aplication with a email not registed', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(401);
  });

  it('should not be able to login in aplication with a wrong password', async () => {
    const user = await factory.attrs('User');

    await request(app).post('/users').send(user);

    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: '123456' });

    expect(response.status).toBe(401);
  });

  it('should not be able to request with invalid token', async () => {
    const response = await request(app)
      .get('/actives')
      .set('Authorization', `Bearer 123456789abcdsads45da34sa354s35`)
      .send({});

    expect(response.status).toBe(401);
  });

  it('should not be able to request without token', async () => {
    const response = await request(app).get('/actives').send({});

    expect(response.status).toBe(401);
  });
});
