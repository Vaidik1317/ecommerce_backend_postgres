module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define(
    "user",
    {
      u_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      number: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },

      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      pincode: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      gender: {
        type: Sequelize.ENUM,
        values: ["Please select:", "male", "female"],
        allowNull: false,
      },
    },
    {
      id: false,
      createdAt: "created_at",
      updatedAt: "updated_at",

      timestamps: true,
      tableName: "users",
      // modelName: "Users",
    }
  );

  // Users.belongsTo(Order, { foreignKey: "order_id" });

  users.associate = (models) => {
    users.hasMany(models.order, {
      foreignKey: "user_u_id",
      sourceKey: "u_id",
    });
  };
  return users;
};
