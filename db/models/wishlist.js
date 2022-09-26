"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.trip);
      this.belongsTo(models.calendar);
    }
  }
  Wishlist.init(
    {
      tripId: {
        type: DataTypes.INTEGER,
        references: {
          model: "trips",
          key: "id",
        },
      },
      placeName: DataTypes.STRING,
      description: DataTypes.STRING,
      recommendation: DataTypes.STRING,
      category: DataTypes.STRING,
      duration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "wishlist",
      underscored: true,
    }
  );
  return Wishlist;
};
