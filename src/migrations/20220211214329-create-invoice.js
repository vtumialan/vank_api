'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vendorId: {
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATEONLY
      },
      total: {
        type: Sequelize.DECIMAL(10, 2)
      },
      paymentTotal: {
        type: Sequelize.DECIMAL(10, 2)
      },
      creditTotal: {
        type: Sequelize.DECIMAL(10, 2)
      },
      bankId: {
        type: Sequelize.INTEGER
      },
      dueDate: {
        type: Sequelize.DATEONLY
      },
      paymentDate: {
        type: Sequelize.DATEONLY
      },
      currency: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Invoices');
  }
};