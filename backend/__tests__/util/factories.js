import { factory } from 'factory-girl';
import faker from 'faker';

import User from '../../src/app/models/User';
import UserActive from '../../src/app/models/UserActive';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('UserActive', UserActive, {
  code: 'ITSA4',
  amount: faker.random.number(100),
  value: faker.finance.amount(),
  buyDate: new Date(),
});

factory.define('Bond', UserActive, {
  name: faker.random.alphaNumeric(),
  value: faker.finance.amount(),
  dueDate: new Date(),
  nowValue: faker.finance.amount(),
});

export default factory;
