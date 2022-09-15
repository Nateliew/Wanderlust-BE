"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Packinglist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Packinglist.init(
    {
      item_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "",
          key: "id",
        },
      },
      quantity: DataTypes.INTEGER,
      bag_type: DataTypes.STRING,
      shared_item: DataTypes.BOOLEAN,
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "",
          key: "id",
        },
      },
      trip_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "trips",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Packinglist",
      underscored: true,
    }
  );
  return Packinglist;
};
