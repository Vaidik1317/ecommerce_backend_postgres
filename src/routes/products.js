const { productsController } = require("../controllers/products");
// const express = require("express");
// const router = express.Router();
module.exports = (app, router) => {
  router.get("/getProducts", productsController.getProducts);
  router.post("/createProducts", productsController.createProducts);
  router.put("/updateProducts", productsController.updateProducts);
  router.delete("/deleteProducts", productsController.deleteProducts);

  app.use("/api", router);
};

// module.exports = router;
