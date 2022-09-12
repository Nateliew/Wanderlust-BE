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
      this.belongsTo(models.trip);
      this.belongsTo(models.user);
    }
  }
  Packinglist.init(
    {
      tripId: {
        type: DataTypes.INTEGER,
        references: {
          model: "trips",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      quantity: DataTypes.INTEGER,
      item: DataTypes.STRING,
      itemId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "packinglist",
      underscored: true,
    }
  );
  return Packinglist;
};
