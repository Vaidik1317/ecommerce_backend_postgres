// const Products = require("../models/products");
const { db } = require("../models");
const { product: products } = db;

// get products
const getProducts = async (req, res) => {
  try {
    const getProduct = await products.findAll({});
    res.status(200).json({ success: true, data: getProduct });
  } catch (error) {
    console.log("Error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Not found" });
  }
};

// create
const createProducts = async (req, res) => {
  // const transaction = await sequelize.transaction();
  try {
    const newProducts = await products.create(
      {
        // product_id: req.body.product_id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        products_category_u_id: req.body.products_category_u_id,
      }
      // { transaction }
    );

    // await transaction.commit();
    res.status(200).json({ success: true, data: newProducts });
  } catch (error) {
    console.log("🚀 ~ createProducts ~ error:", error);
    // await transaction.rollback();
    res
      .status(500)
      .json({ success: false, message: "Failed to create new product" });
  }
};

// update
const updateProducts = async (req, res) => {
  // const transaction = await sequelize.transaction();

  try {
    const product = await products.findOne({
      where: { product_u_id: req.params.product_u_id },
    });

    if (!product) {
      res.status(404).json({ success: false, message: "not found" });
    }

    (product.name = req.body.name),
      (product.description = req.body.description),
      (product.price = req.body.price),
      (product.quantity = req.body.quantity),
      (product.category_id = req.body.category_id),
      await product.save({});

    // await transaction.commit();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    // await transaction.rollback();

    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

// delete
const deleteProducts = async (req, res) => {
  // const transaction = await sequelize.transaction();
  try {
    const product = await products.findOne({
      where: { product_id: req.params.product_id },
    });

    if (!product) {
      res.status(404).json({ success: false, message: "not found" });
    }

    await products.destroy({
      where: { product_id: req.params.product_id },
      transaction,
    });

    // await transaction.commit();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    // await transaction.rollback();

    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports.productsController = {
  getProducts,
  createProducts,
  updateProducts,
  deleteProducts,
};
