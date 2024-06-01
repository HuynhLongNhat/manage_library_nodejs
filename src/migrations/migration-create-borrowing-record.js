'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('borrowingRecords', 'readerId', {
      type: Sequelize.INTEGER, // hoặc BIGINT tùy thuộc vào kiểu dữ liệu của trường "code" trong bảng "Readers"
      allowNull: false,
      references: {
        model: 'reader',
        key: 'code'
      }
    });
    await queryInterface.createTable('borrowingRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      readerId: {
        type: Sequelize.STRING
      },
      bookId: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      staffId: {
        type: Sequelize.STRING
      },
      bookStatus: {
        type: Sequelize.STRING
      },
      borrowDate: {
        type: Sequelize.STRING
      },
      returnDate: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('borrowingRecords');
    await queryInterface.changeColumn('borrowingRecords', 'readerId', {
      type: Sequelize.STRING, // hoặc kiểu dữ liệu ban đầu
      allowNull: false,
      references: {
        model: 'Readers',
        key: 'id'
      }
    });
  }
};