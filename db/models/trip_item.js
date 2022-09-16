"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TripItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.trip);
      this.belongsTo(models.item);
    }
  }
  TripItem.init(
    {
      itemId: {
        type: DataTypes.INTEGER,
        references: {
          model: "items",
          key: "id",
        },
      },
      quantity: DataTypes.INTEGER,
      bagType: DataTypes.STRING,
      sharedItem: DataTypes.BOOLEAN,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "",
          key: "id",
        },
      },
      tripId: {
        type: DataTypes.INTEGER,
        references: {
          model: "trips",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "trip_item",
      underscored: true,
    }
  );
  return TripItem;
};
