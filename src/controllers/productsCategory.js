const { db } = require("../models");
const { category: productsCategory } = db;

// const productsCategory = require("../models/productsCategory");
const getProductsCategory = async (req, res) => {
  try {
    const getCategory = await productsCategory.findAll({});
    res.status(200).json({ success: true, data: getCategory });
  } catch (error) {
    console.log("Error in fetching products category:", error.message);
    res.status(500).json({ success: false, message: "Not found" });
  }
};

// create
const createProductsCategory = async (req, res) => {
  try {
    const newCategory = await productsCategory.create({
      name: req.body.name,
    });

    res.status(200).json({ success: true, data: newCategory });
  } catch (error) {
    console.log("error in createProductsCategory ", error);

    res
      .status(500)
      .json({ success: false, message: "Failed to create new product" });
  }
};

// update
const updateProductsCategory = async (req, res) => {
  try {
    const updateCategory = await productsCategory.findOne({
      where: { category_id: req.params.category_id },
    });

    if (!updateCategory) {
      res.status(404).json({ success: false, message: "not found" });
    }

    (updateCategory.name = req.body.name),
      await updateCategory.save({ transaction });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

// delete
const deleteProductsCategory = async (req, res) => {
  // const transaction = await sequelize.transaction();
  try {
    const product = await productsCategory.findOne({
      where: { category_id: req.params.category_id },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "not found" });
    }

    await productsCategory.destroy({
      where: { category_id: req.params.category_id },
      transaction,
    });

    // await transaction.commit();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    // await transaction.rollback();

    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports.productCategoryController = {
  getProductsCategory,
  createProductsCategory,
  updateProductsCategory,
  deleteProductsCategory,
};
