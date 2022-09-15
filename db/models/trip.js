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
        through: "user_trips",
      });
      this.hasMany(models.packinglist);
    }
  }
  Trip.init(
    {
      country: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      duration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "trip",
      underscored: true,
    }
  );
  return Trip;
};
