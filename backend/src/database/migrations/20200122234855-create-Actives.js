module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Actives', {
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
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('ETF', 'FII', 'REIT', 'Stock', 'Bond'),
        allowNull: false,
        defaultValue: 'Stock',
      },
      price: Sequelize.FLOAT,
      lastPrice: Sequelize.FLOAT,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: queryInterface => queryInterface.dropTable('Actives'),
};
