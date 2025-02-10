module.exports = (sequelize, Sequelize) => {
  const productsCategory = sequelize.define(
    "product_categories",
    {
      u_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "product_categories",
    }
  );

  // ProductsCategory.belongsTo(Products, { foreignKey: "category_id" });
  // ProductsCategory.hasMany(Products, { foreignKey: "category_id" });

  productsCategory.associate = (models) => {
    productsCategory.hasMany(models.product, {
      foreignKey: "products_category_u_id",
      sourceKey: "u_id",
    });
  };
  return productsCategory;
};
