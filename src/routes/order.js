const { orderController } = require("../controllers/order");
// const router = express.Router();

module.exports = (app, router) => {
  router.get("/getOrder", orderController.getOrders);
  // router.get("/report", orderController.loadReport);
  router.get("/invoicePdf", orderController.invoicePdf);
  router.post("/createOrders", orderController.createOrders);
  router.delete("/deleteOrder", orderController.deleteOrders);

  app.use("/api", router);
};

// module.exports = router;
