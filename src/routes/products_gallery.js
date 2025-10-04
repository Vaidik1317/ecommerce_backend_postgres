const { productsGalleryController } = require("../controllers/product_gallery");

module.exports = (app, router) => {
  router.get("/getGallery", productsGalleryController.getGallery);
  router.post(
    "/createGallery",
    productsGalleryController.uploads
    // productsGalleryController.createGallery
  );
  router.delete("/deleteGallery/:id", productsGalleryController.deleteImage);

  app.use("/api", router);
};
