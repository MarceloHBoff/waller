import Sequelize from 'sequelize';

import User from '../app/models/User';
import Bond from '../app/models/Bond';
import Stock from '../app/models/Stock';
import UserStock from '../app/models/UserStock';

import databaseConfig from '../config/database';

const models = [User, Bond, Stock, UserStock];

class Database {
  constructor() {
    this.init();
    this.associate();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
