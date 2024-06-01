'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class borrowingRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      borrowingRecord.belongsTo(models.book,
        {
          foreignKey: 'bookId',
          as: "bookData"
        });
      borrowingRecord.belongsTo(models.reader,
        {
          foreignKey: 'readerId',

          as: "readerData"
        });

    }
  };
  borrowingRecord.init({
    readerId: DataTypes.STRING,
    bookId: DataTypes.STRING,
    staffId: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    bookStatus: DataTypes.STRING,
    borrowDate: DataTypes.STRING,
    returnDate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'borrowingRecord',
  });
  return borrowingRecord;
};