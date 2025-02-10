const { dBConnection, Sequelize } = require("../db-connection/index");
// const sequelize = require("../db-connection");
// const Sequelize = require("sequelize");

const db = {};
// db.sequelize = dBConnection;
db.sequelize = dBConnection;
db.Sequelize = Sequelize;

db.admin = require("./admin")(dBConnection, Sequelize);
db.category = require("./productsCategory")(dBConnection, Sequelize);
db.product = require("./products")(dBConnection, Sequelize);
db.gallery = require("./productsGallery")(dBConnection, Sequelize);
db.user = require("./user")(dBConnection, Sequelize);
db.order = require("./order")(dBConnection, Sequelize);
db.items = require("./orderItems")(dBConnection, Sequelize);

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = { db };
