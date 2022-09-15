"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("packingitems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      item_name: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("packingitems");
  },
};
