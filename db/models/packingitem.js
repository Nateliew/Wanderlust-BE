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
      this.belongsToMany(models.packinglist, {
        through: "packinglist_packingitems",
      });
    }
  }
  Packingitem.init(
    {
      item: DataTypes.STRING,

      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "packingitem",
      underscored: true,
    }
  );
  return Packingitem;
};
