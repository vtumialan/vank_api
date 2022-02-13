'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // associations can be defined here
    }
  }
  Client.init({
    name: DataTypes.STRING,
    internalCode: DataTypes.STRING,
    taxId: DataTypes.INTEGER,
    currency: DataTypes.ENUM('USD', 'EUR', 'CLP'),
    quota: DataTypes.INTEGER,
    bankRegisters: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('bankRegisters').split(';')
      },
      set(val) {
        this.setDataValue('bankRegisters', val.join(';'));
      },
    }
  }, {
    sequelize,
    modelName: 'Client',
  });

  return Client;
};