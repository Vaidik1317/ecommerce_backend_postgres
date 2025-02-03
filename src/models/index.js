const sequelize = require("../db-connection");
const Sequelize = require("sequelize");

const db = {};
db.Sequelize = sequelize;
db.Sequelize = Sequelize;

db.admin = require("./admin")(sequelize, Sequelize);
db.category = require("./productsCategory")(sequelize, Sequelize);
db.product = require("./products")(sequelize, Sequelize);
db.gallary = require("./productsGallary")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.order = require("./order")(sequelize, Sequelize);
// db.items = require('./orderItems')(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = {
  db,
};
