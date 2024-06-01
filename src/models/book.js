'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      book.hasMany(models.borrowingRecord,
        {
          foreignKey: 'bookId',
          as: "bookData"
        });
    }
  };
  book.init({
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    image: DataTypes.TEXT,
    publicYear: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};