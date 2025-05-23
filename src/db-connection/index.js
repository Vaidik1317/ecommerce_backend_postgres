const Sequelize = require("sequelize");
require("dotenv").config(); // Load environment variables

// Determine which database to use based on NODE_ENV
const dbURI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_URI
    : process.env.PG_DB_URI;
console.log("🚀 ~ dbURI:", dbURI);

const sequelize = new Sequelize(dbURI, {
  dialect: "postgres",
  logging: false, // Disable logging for cleaner test output
});

module.exports = {
  Sequelize,
  sequelize,
};
