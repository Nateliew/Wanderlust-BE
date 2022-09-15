"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user);
      this.belongsTo(models.trip);
    }
  }
  Comment.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      text: DataTypes.String,
      trip_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "trips",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "comment",
      underscored: true,
    }
  );
  return Comment;
};