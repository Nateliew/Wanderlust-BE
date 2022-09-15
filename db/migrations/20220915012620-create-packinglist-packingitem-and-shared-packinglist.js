"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("packinglist_packingitems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      packinglist_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "packinglists",
          key: "id",
        },
      },
      packingitem_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "packingitems",
          key: "id",
        },
      },
      quantity: {
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
    });

    await queryInterface.createTable("shared_packinglists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      packinglist_packingitem_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "packinglists",
          key: "id",
        },
      },
      item_owner: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
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
    await queryInterface.dropTable("packinglist_packingitems");
    await queryInterface.dropTable("shared_packinglists");
  },
};
