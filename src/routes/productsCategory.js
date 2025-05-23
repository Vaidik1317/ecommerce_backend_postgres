const {
  productCategoryController,
} = require("../controllers/productsCategory");

module.exports = (app, router) => {
  router.get(
    "/getProductsCategory",
    productCategoryController.getProductsCategory
  );
  router.post(
    "/createProductsCategory",
    productCategoryController.createProductsCategory
  );
  router.put(
    "/updateProductsCategory/:u_id",
    productCategoryController.updateProductsCategory
  );
  router.delete(
    "/deleteProductsCategory/:u_id",
    productCategoryController.deleteProductsCategory
  );
};
