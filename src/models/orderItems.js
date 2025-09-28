module.exports = (sequelize, Sequelize) => {
  const orderItems = sequelize.define(
    "orderItems",
    {
      u_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },

      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      id: false,
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,

      tableName: "order_Items",
    }
  );

  orderItems.associate = (models) => {
    orderItems.belongsTo(models.order, {
      foreignKey: "order_u_id",
      targetKey: "u_id",
    });

    orderItems.belongsTo(models.product, {
      foreignKey: "products_u_id",
      targetKey: "u_id",
    });

    // orderItems.hasMany(models.product, {
    //   foreignKey: "order_items_u_id",
    //   sourceKey: "u_id",
    // });
  };

  return orderItems;
};
