module.exports = (sequelize, Sequelize) => {
  const order = sequelize.define(
    "order",
    {
      u_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
      },

      total_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM,
        values: ["pending", "accept", "reject"],
        allowNull: false,
      },

      date: {
        type: Sequelize.DATE,

        allowNull: false,
      },

      // quantity: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      // },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
      tableName: "order",
    }
  );

  order.associate = (models) => {
    order.belongsTo(models.user, {
      foreignKey: "user_u_id",
      targetKey: "u_id",
    });

    order.hasMany(models.items, {
      foreignKey: "order_u_id",
      sourceKey: "u_id",
    });
    // order.hasOne(models.user, {
    //   foreignKey: "user_u_id",
    //   sourceKey: "u_id",
    // });
  };

  return order;
};
