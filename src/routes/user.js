const { usersController } = require("../controllers/user");

module.exports = (app, router) => {
  router.get("/getUsers", usersController.getUsers);
  router.post("/createUsers", usersController.createUsers);
  router.put("/updateUsers", usersController.updateUsers);
  router.delete("/deleteUsers", usersController.deleteUsers);

  app.use("/api", router);
};
