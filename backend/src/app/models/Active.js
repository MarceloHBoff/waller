import Sequelize, { Model } from 'sequelize';

class Active extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.STRING,
        name: Sequelize.STRING,
        type: Sequelize.ENUM('ETF', 'FII', 'REIT', 'Stock', 'Bond'),
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
    this.belongsToMany(models.UserActive, {
      foreignKey: 'activeId',
      through: 'UserActives',
      as: 'Actives',
    });

    this.belongsToMany(models.Dividend, {
      foreignKey: 'activeId',
      through: 'Dividends',
      as: 'Dividend',
    });
  }
}

export default Active;
