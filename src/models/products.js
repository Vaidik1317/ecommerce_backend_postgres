const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db-connection");

const ProductsCategory = require("./productsCategory"); // Correct import
const ProductsGallary = require("./productsGallary"); // Correct import

class Products extends Model {}

Products.init(
  {
    product_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    category_id: {
      type: DataTypes.UUID,
      references: {
        model: ProductsCategory, // foreign key reference
        key: "category_id",
      },
    },
  },
  {
    sequelize,
    modelName: "Products",
    tableName: "products",
    timestamps: true,
  }
);

// Define associations here
Products.belongsTo(ProductsCategory, { foreignKey: "category_id" }); // Association with ProductsCategory
Products.hasMany(ProductsGallary, { foreignKey: "product_id" }); // Association with ProductsGallary

module.exports = Products;
