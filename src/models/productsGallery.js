module.exports = (sequelize, Sequelize) => {
  const productsGallery = sequelize.define(
    "product_gallery",
    {
      u_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
      },

      products_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
      tableName: "product_gallery",
      // modelName: "ProductsGallery",
    }
  );

  productsGallery.associate = (models) => {
    productsGallery.belongsTo(models.product, {
      foreignKey: "products_u_id",
      targetKey: "u_id",
    });
  };
  return productsGallery;
};
