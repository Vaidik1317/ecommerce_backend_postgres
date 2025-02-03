const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db-connection");
class Admin extends Model {}

Admin.init(
  {
    u_id: {
      type: DataTypes.UUID,
      DefaultValue: DataTypes.UUIDV4,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    sequelize,
    timestamps: true,
    tableName: "admin",
    modelName: "admin",
  }
);

module.exports = Admin;
