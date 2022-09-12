"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Packingitem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Packingitem.init(
    {
      item: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "packingitem",
    }
  );
  return Packingitem;
};
