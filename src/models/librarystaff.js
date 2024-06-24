'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class libraryStaff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      libraryStaff.hasMany(models.borrowingRecord,
        {
          foreignKey: 'staffId',
          as: "libraryStaffData"
        });
    }
  };
  libraryStaff.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,

    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'libraryStaff',
  });
  return libraryStaff;
};