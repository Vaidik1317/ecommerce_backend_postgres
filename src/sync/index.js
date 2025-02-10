const { db } = require("../models");
// const sequelize = require("../db-connection");
const dbSync = async () => {
  try {
    await db.sequelize.sync({ force: false, alter: true });
  } catch (error) {
    console.log("🚀 ~ dbSync ~ error:", error);
  }
};

module.exports = { dbSync };
