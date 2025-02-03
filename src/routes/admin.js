const { adminController } = require("../controllers/admin");

module.exports = (app, router) => {
  router.get("/getAdmin", adminController.getAdmin);
  router.put("/updateAdmin", adminController.updateAdmin);

  app.use("/api", router);
};
