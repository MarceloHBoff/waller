import Sequelize, { Model } from 'sequelize';

class Fundamentals extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.STRING,
        year: Sequelize.INTEGER,
        revenue: Sequelize.FLOAT,
        margin: Sequelize.FLOAT,
        ebitda: Sequelize.FLOAT,
        margin_ebitda: Sequelize.FLOAT,
        financial_result: Sequelize.FLOAT,
        profit: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Fundamentals;
