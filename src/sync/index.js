const sequelize = require("../db-connection");
// const sequelize = require("../models");
// const sequelize = db.sequelize;

const dbSync = async (req, res) => {
  await sequelize.sync({ force: false, alter: true });
};

module.exports = dbSync;
