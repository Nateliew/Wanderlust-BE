"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.user, {
        through: "user_trip",
      });
      this.hasOne(models.wishlist);

      this.hasMany(models.comment);

      this.belongsToMany(models.item, {
        through: "trip_items",
      });
    }
  }
  Trip.init(
    {
      country: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      duration: DataTypes.INTEGER,
      // userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "trip",
      underscored: true,
    }
  );
  return Trip;
};
