import Sequelize, { Model } from 'sequelize';

class Bond extends Model {
  static init(sequelize) {
    super.init(
      {
        userId: Sequelize.INTEGER,
        title: Sequelize.STRING,
        value: Sequelize.FLOAT,
        dueDate: Sequelize.DATE,
        nowRentability: Sequelize.FLOAT,
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
    this.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

export default Bond;
