import Sequelize from 'sequelize';

import Active from '../app/models/Active';
import Dividend from '../app/models/Dividend';
import User from '../app/models/User';
import UserActive from '../app/models/UserActive';

import databaseConfig from '../config/database';

const models = [Active, Dividend, UserActive, User];

class Database {
  constructor() {
    this.init();
    this.associate();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
  }

  associate() {
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
