"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Packinglist_Packingitem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.packinglist);
      this.belongsToMany(models.packingitems);
      this.hasOne(models.shared_packinglist);
    }
  }
  Packinglist_Packingitem.init(
    {
      packinglist_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "packinglists",
          key: "id",
        },
      },
      packingitem_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "packingitems",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "packinglist_packingitem",
      underscored: true,
    }
  );
  return Packinglist_Packingitem;
};
