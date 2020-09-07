import request from 'supertest';

import app from '../../src/app';
import factory from './factories';

export default async function login() {
  const user = await factory.create('User');

  const login = await request(app)
    .post('/sessions')
    .send({ email: user.email, password: user.password });

  return login.body.token;
}
