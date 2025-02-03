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
    "/updateProductsCategory",
    productCategoryController.updateProductsCategory
  );
  router.delete(
    "/deleteProductsCategory",
    productCategoryController.deleteProductsCategory
  );
};
