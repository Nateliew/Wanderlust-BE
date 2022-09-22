"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("trip_items", "item_uid", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("trip_items", "column_index", {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("trip_items", "item_uid", {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn("trip_items", "column_index", {
      type: Sequelize.INTEGER,
    });
  },
};
