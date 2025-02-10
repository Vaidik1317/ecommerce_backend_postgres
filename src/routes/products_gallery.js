const { productsGalleryController } = require("../controllers/product_gallery");

module.exports = (app, router) => {
  router.get("/getGallery", productsGalleryController.getGallery);
  router.post("/createGallery", productsGalleryController.createGallery);

  app.use("/api", router);
};
