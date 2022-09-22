"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable("packingitems", "items");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable("items", "packingitems");
  },
};
