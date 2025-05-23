const { usersController } = require("../controllers/user");

module.exports = (app, router) => {
  router.get("/getUsers", usersController.getUsers);
  router.post("/createUsers", usersController.createUsers);
  router.post("/login", usersController.login);
  router.put("/updateUsers/:u_id", usersController.updateUsers);
  router.delete("/deleteUsers/:u_id", usersController.deleteUsers);
  router.get("/exportUser", usersController.exportUser);

  app.use("/api", router);
};
