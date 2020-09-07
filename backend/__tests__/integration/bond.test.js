import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../util/factories';
import login from '../util/login';

describe('Active', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create register and list Bond in database', async () => {
    const token = await login();
    const bond = await factory.attrs('Bond');

    await request(app)
      .post('/actives/bonds')
      .set('Authorization', `Bearer ${token}`)
      .send(bond);

    const response = await request(app)
      .get('/actives/bonds')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.body[0]).toHaveProperty('id');
  });

  it('should be able to update register Bond', async () => {
    const token = await login();
    const bond = await factory.attrs('Bond');

    const active = await request(app)
      .post('/actives/bonds')
      .set('Authorization', `Bearer ${token}`)
      .send(bond);

    const response = await request(app)
      .put(`/actives/bonds/${active.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...bond, value: 5000 });

    expect(response.body.value).toBe(5000);
  });

  it('should be able to delete register Bond', async () => {
    const token = await login();
    const bond = await factory.attrs('Bond');

    const active = await request(app)
      .post('/actives/bonds')
      .set('Authorization', `Bearer ${token}`)
      .send(bond);

    const response = await request(app)
      .delete(`/actives/bonds/${active.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(200);
  });

  it('should not be able to update register that not exists', async () => {
    const token = await login();
    const bond = await factory.attrs('Bond');

    await request(app)
      .post('/actives/bonds')
      .set('Authorization', `Bearer ${token}`)
      .send(bond);

    const response = await request(app)
      .put(`/actives/bonds/99999`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...bond, value: 5000 });

    expect(response.status).toBe(400);
  });

  it('should not be able to delete register that not exists', async () => {
    const token = await login();
    const bond = await factory.attrs('Bond');

    await request(app)
      .post('/actives/bonds')
      .set('Authorization', `Bearer ${token}`)
      .send(bond);

    const response = await request(app)
      .delete('/actives/bonds/99999')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
  });
});
