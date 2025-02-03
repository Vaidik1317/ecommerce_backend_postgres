const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ecommerce", "postgres", "system123", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
   .authenticate()
   .then( ()=>console.log("connected to the database"))
   .catch( (err)=> console.log('Unable to connect:', err));

module.exports = sequelize;