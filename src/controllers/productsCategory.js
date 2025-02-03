const sequelize = require("../db-connection");
// const Products = require("../models/products");
const ProductCategory = require("../models/productsCategory");
const getProductsCategory = async (res, req) => {
  try {
    const getCategory = await ProductCategory.findAll({});
    res.status(200).json({ success: true, data: getCategory });
  } catch (error) {
    console.log("Error in fetching products category:", error.message);
    // res.send(500).json({ success: false, message: "Not found" });
  }
};

// create
const createProductsCategory = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const newCategory = await ProductCategory.create(
      {
        name: req.body.name,
      },
      { transaction }
    );

    await transaction.commit();
    res.status(200).json({ success: true, data: newCategory });
  } catch (error) {
    console.log("🚀 ~ createProductsCategory ~ error:", error);
    await transaction.commit();
    res
      .status(500)
      .json({ success: false, message: "Failed to create new product" });
  }
};

// update
const updateProductsCategory = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const updateCategory = await ProductCategory.findOne({
      where: { category_id: req.params.category_id },
    });

    if (!product) {
      res.status(404).json({ success: false, message: "not found" });
    }

    (updateCategory.name = req.body.name),
      await updateCategory.save({ transaction });

    await transaction.commit();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    await transaction.rollback();

    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

// delete
const deleteProductsCategory = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const product = await ProductCategory.findOne({
      where: { category_id: req.params.category_id },
    });

    if (!product) {
      res.status(404).json({ success: false, message: "not found" });
    }

    await ProductCategory.destroy({
      where: { category_id: req.params.category_id },
      transaction,
    });

    await transaction.commit();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    await transaction.rollback();

    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports.productCategoryController = {
  getProductsCategory,
  createProductsCategory,
  updateProductsCategory,
  deleteProductsCategory,
};
