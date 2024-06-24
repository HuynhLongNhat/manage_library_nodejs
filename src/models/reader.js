'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reader extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reader.hasMany(models.borrowingRecord,
        {
          foreignKey: 'readerId',
          as: "readerData"
        });
    }
  };
  reader.init({

    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.TEXT,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reader',
  });
  return reader;
};