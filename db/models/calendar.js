"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Calendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.trip);
      this.hasOne(models.wishlist);
    }
  }
  Calendar.init(
    {
      wishlist_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "wishlists",
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
      start_datetime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "calendar",
      underscored: true,
    }
  );
  return Calendar;
};
