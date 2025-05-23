const { adminController } = require("../controllers/admin");

module.exports = (app, router) => {
  router.get("/getAdmin", adminController.getAdmin);
  router.post("/createAdmin", adminController.createAdmin);
  router.put("/updateAdmin/:u_id", adminController.updateAdmin);

  app.use("/api", router);
};
