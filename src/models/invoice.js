'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoice.init({
    vendorId: DataTypes.INTEGER,
    number: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    total: DataTypes.DECIMAL(10, 2),
    paymentTotal: DataTypes.DECIMAL(10, 2),
    creditTotal: DataTypes.DECIMAL(10, 2),
    bankId: DataTypes.INTEGER,
    dueDate: DataTypes.DATEONLY,
    paymentDate: DataTypes.DATEONLY,
    currency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};