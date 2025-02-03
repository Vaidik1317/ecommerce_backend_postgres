const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db-connection");

class ProductsCategory extends Model {}

ProductsCategory.init(
  {
    category_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "ProductCategory",
    tableName: "product_categories",
    timestamps: true,
  }
);

module.exports = ProductsCategory;
