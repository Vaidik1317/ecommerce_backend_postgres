const Sequelize = require("sequelize");

const proConfig = {
  use_env_variable: "postgresql://postgres:system123@localhost:5432/ecommerce",
  dialect: "postgres",
  dialectOptions: {},
  logging: false,
};

const dBConnection = new Sequelize(
  "postgresql://postgres:system123@localhost:5432/ecommerce",
  proConfig
);

// const sequelize = new Sequelize("ecommerce", "postgres", "system123", {
//   host: "localhost",
//   dialect: "postgres",
// });
module.exports = {
  Sequelize,
  dBConnection,
};
// module.exports = sequelize;
