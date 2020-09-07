import Sequelize, { Model } from 'sequelize';

class UserActive extends Model {
  static init(sequelize) {
    super.init(
      {
        userId: Sequelize.INTEGER,
        activeId: Sequelize.INTEGER,
        amount: Sequelize.INTEGER,
        buyDate: Sequelize.DATE,
        value: Sequelize.FLOAT,
        dueDate: Sequelize.DATE,
        nowValue: Sequelize.FLOAT,
        automatic: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Active, { foreignKey: 'activeId' });
    this.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

export default UserActive;
