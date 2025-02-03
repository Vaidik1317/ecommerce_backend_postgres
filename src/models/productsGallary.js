const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db-connection");

class ProductsGallary extends Model {}

ProductsGallary.init(
  {
    gallary_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },

    products_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "product_gallery",
    modelName: "ProductsGallary",
  }
);

module.exports = ProductsGallary;
