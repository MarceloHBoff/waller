module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('UserActives', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      activeId: {
        type: Sequelize.INTEGER,
        references: { model: 'Actives', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      buyDate: Sequelize.DATE,
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      dueDate: Sequelize.DATE,
      nowValue: Sequelize.FLOAT,
      automatic: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
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

  down: queryInterface => queryInterface.dropTable('UserActives'),
};
