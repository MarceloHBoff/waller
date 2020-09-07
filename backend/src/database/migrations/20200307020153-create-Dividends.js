module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Dividends', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      activeId: {
        type: Sequelize.INTEGER,
        references: { model: 'Actives', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('jscp', 'dividendos'),
        allowNull: false,
        defaultValue: 'jscp',
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      aprovedDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      EXDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      payDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('Dividends'),
};
