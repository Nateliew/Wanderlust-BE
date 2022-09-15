"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shared_Packinglist extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.packinglist_packingitem);
      this.belongsTo(models.user, {
        foreignKey: "item_owner",
      });
    }
  }
  Shared_Packinglist.init(
    {
      packinglist_packingitem_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "packinglist_packingitems",
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
    },
    {
      sequelize,
      modelName: "shared_packinglist",
      underscored: true,
    }
  );
  return Shared_Packinglist;
};
