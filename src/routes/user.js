const { usersController } = require("../controllers/user");
const authMiddleware = require("../../middleware/authMiddleware");

module.exports = (app, router) => {
  router.get("/getUsers", usersController.getUsers);
  router.post("/createUsers", usersController.createUsers); 
  router.post("/login", usersController.login);
  router.post("/refreshToken", usersController.refreshToken);
  router.post("/logout", usersController.logout);
  router.put("/updateUsers/:u_id", usersController.updateUsers);
  router.delete("/deleteUsers/:u_id", usersController.deleteUsers);
  router.get("/exportUser", usersController.exportUser);
  router.get("/getUserOrders", authMiddleware, usersController.getUserOrders);

  app.use("/api", router);
};
