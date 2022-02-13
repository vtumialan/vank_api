'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      internalCode: {
        type: Sequelize.STRING
      },
      taxId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      currency: {
        type: Sequelize.ENUM('USD', 'EUR', 'CLP'),
        allowNull: false
      },
      quota: {
        type: Sequelize.INTEGER,
        defaultValue: 10000
      },
      bankRegisters: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clients');
  }
};