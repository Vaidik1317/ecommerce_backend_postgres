module.exports = (sequelize, Sequelize) => {
  const products = sequelize.define(
    "products",
    {
      u_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      products_category_u_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
    },
    {
      id: false,
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
      tableName: "products",
    }
  );

  products.associate = (models) => {
    products.belongsTo(models.category, {
      foreignKey: "products_category_u_id",
      targetKey: "u_id",
    });

    products.hasMany(models.gallery, {
      foreignKey: "products_u_id",
      sourceKey: "u_id",
    });

    products.hasMany(models.items, {
      foreignKey: "products_u_id",
      sourceKey: "u_id",
    });
  };

  return products;
};
