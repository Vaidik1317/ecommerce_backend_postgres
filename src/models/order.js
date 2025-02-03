const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db-connection");

const Users = require("./user");
const Products = require("./products");

class Order extends Model {}

Order.init(
  {
    order_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,

      references: {
        model: Users, // foreign key
        key: "user_id",
      },
    },

    product_id: {
      type: DataTypes.UUID,
      allowNull: false,

      references: {
        model: Products,
        key: "product_id",
      },
    },
    // order_items: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,

    //   references: {},
    // },

    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "order",
  }
);

Order.belongsTo(Products, { foreignKey: "product_id" });
Order.belongsTo(Users, { foreignKey: "user_id" });

module.exports = Order;
