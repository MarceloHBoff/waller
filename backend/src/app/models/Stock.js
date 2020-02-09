import Sequelize, { Model } from 'sequelize';

class Stock extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.STRING,
        name: Sequelize.STRING,
        type: Sequelize.ENUM('ETF', 'FII', 'REIT', 'Stock'),
        price: Sequelize.FLOAT,
        lastPrice: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.UserStock, {
      foreignKey: 'stockId',
      through: 'UserStocks',
      as: 'Stocks',
    });
  }
}

export default Stock;
