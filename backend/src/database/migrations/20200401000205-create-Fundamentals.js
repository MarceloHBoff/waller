module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Fundamentals', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      revenue: Sequelize.FLOAT,
      margin: Sequelize.FLOAT,
      ebitda: Sequelize.FLOAT,
      margin_ebitda: Sequelize.FLOAT,
      financial_result: Sequelize.FLOAT,
      profit: Sequelize.FLOAT,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: queryInterface => queryInterface.dropTable('Fundamentals'),
};
