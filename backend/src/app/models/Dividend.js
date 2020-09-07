import Sequelize, { Model } from 'sequelize';

class Dividend extends Model {
  static init(sequelize) {
    super.init(
      {
        activeId: Sequelize.INTEGER,
        type: Sequelize.ENUM('jscp', 'dividendos'),
        value: Sequelize.FLOAT,
        aprovedDate: Sequelize.DATE,
        EXDate: Sequelize.DATE,
        payDate: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Active, { foreignKey: 'activeId' });
  }
}

export default Dividend;
