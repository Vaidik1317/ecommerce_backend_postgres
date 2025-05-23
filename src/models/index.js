const { sequelize, Sequelize } = require("../db-connection/index");
// const sequelize = require("../db-connection");
// const Sequelize = require("sequelize");

const db = {};
// db.sequelize = sequelize;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.admin = require("./admin")(sequelize, Sequelize);
db.category = require("./productsCategory")(sequelize, Sequelize);
db.product = require("./products")(sequelize, Sequelize);
db.gallery = require("./productsGallery")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.order = require("./order")(sequelize, Sequelize);
db.items = require("./orderItems")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});
async function resetDatabase() {
  if (process.env.NODE_ENV === "test") {
    console.log("Dropping and recreating the test database...");
    await sequelize.sync({ force: true }); // Drops all tables and recreates them
  }
}

db.resetDatabase = resetDatabase;

// // Automatically sync database when app starts
// const syncDatabase = async () => {
//   try {
//     const isTestEnv = process.env.NODE_ENV === "test";
//     console.log(`🚀 Syncing database in ${process.env.NODE_ENV} mode`);

//     await sequelize.sync({ force: isTestEnv, alter: !isTestEnv }); // Force sync only in test mode

//     // console.log("✅ Database sync successful");
//   } catch (error) {
//     console.error("❌ Database sync failed:", error);
//   }
// };

// // Call sync function when models are loaded
// syncDatabase();

module.exports = { db };
