"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("trips", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country: {
        type: Sequelize.STRING,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      // user_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: "users",
      //     key: "id",
      //   },
      // },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("trips");
  },
};
