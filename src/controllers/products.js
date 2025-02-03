const sequelize = require("../db-connection");
const Products = require("../models/products");

// get products
const getProducts = async (req, res) => {
  try {
    const getProduct = await Products.findAll({});
    res.status(200).json({ success: true, data: getProduct });
  } catch (error) {
    console.log("Error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Not found" });
  }
};

// create
const createProducts = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const newProducts = await Products.create(
      {
        product_id: req.body.product_id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category_id: req.body.category_id,
      },
      { transaction }
    );

    await transaction.commint();
    res.status(200).json({ success: true, data: newProducts });
  } catch (error) {
    await transaction.commit();
    res
      .status(500)
      .json({ success: false, message: "Failed to create new product" });
  }
};

// update
const updateProducts = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const product = await Products.findOne({
      where: { product_id: req.params.product_id },
    });

    if (!product) {
      res.status(404).json({ success: false, message: "not found" });
    }

    (product.name = req.body.name),
      (product.description = req.body.description),
      (product.price = req.body.price),
      (product.quantity = req.body.quantity),
      (product.category_id = req.body.category_id),
      await product.save({ transaction });

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
const deleteProducts = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const product = await Products.findOne({
      where: { product_id: req.params.product_id },
    });

    if (!product) {
      res.status(404).json({ success: false, message: "not found" });
    }

    await Products.destroy({
      where: { product_id: req.params.product_id },
      transaction,
    });

    await transaction.commit();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    await transaction.rollback();

    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports.productsController = {
  getProducts,
  createProducts,
  updateProducts,
  deleteProducts,
};
