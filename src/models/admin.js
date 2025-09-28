module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define(
    "admin",
    {
      u_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
    },
    {
      id: false,
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
      tableName: "admin",
    }
  );

  return Admin;
};
