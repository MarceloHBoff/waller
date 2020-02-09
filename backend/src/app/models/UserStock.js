import Sequelize, { Model } from 'sequelize';

class UserStock extends Model {
  static init(sequelize) {
    super.init(
      {
        userId: Sequelize.INTEGER,
        stockId: Sequelize.INTEGER,
        amount: Sequelize.INTEGER,
        averagePrice: Sequelize.FLOAT,
        automatic: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Stock, { foreignKey: 'stockId' });
    this.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

export default UserStock;
