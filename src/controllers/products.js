// const Products = require("../models/products");
const { db } = require("../models");
const { product: products, gallery: productsGalleryModel } = db;
const fs = require("fs");

// const generateNumber = (length) => {
//   let result = "";
//   const characters = "0123456789";
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }

//   return result;
// };

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
  console.log("🚀 ~ createProducts ~ createProducts:", req.body);
  // const transaction = await sequelize.transaction();
  try {
    const newProducts = await products.create(
      {
        // product_id: req.body.product_id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        color: req.body.color,
        products_category_u_id: req.body.products_category_u_id,
      }
      // { transaction }
    );

    // for (let i = 0; i < req.files.products_url.length; i++) {
    //   const generateName = generateNumber(10);
    //   let imageName;
    //   if (req.files.products_url[i].mimetype === "application/pdf") {
    //     imageName = `PRO-IMG-` + generateName + ".pdf";
    //   } else {
    //     imageName = "PRO-IMG" + generateName + ".png";
    //   }

    //   if (!fs.existsSync("public/upload")) {
    //     fs.mkdirSync("public/upload", { recursive: true });
    //   }

    //   // for()
    //   await new Promise(function (resolve, reject) {
    //     req.files.products_url[i].mv(
    //       `public/upload/` + imageName,

    //       async function (err) {
    //         if (err) {
    //           reject(err);
    //         } else {
    //           resolve(null);
    //         }
    //       }
    //     );
    //   });

    //   await productsGalleryModel.create({
    //     products_url: `public/upload/` + imageName,
    //     products_u_id: newProducts.u_id,
    //   });
    // }

    // await transaction.commit();
    res.status(201).json({ success: true, data: newProducts });
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
      where: { u_id: req.params.u_id },
    });
    console.log("🚀 ~ updateProducts ~ product:", product);

    if (!product) {
      res.status(404).json({ success: false, message: "not found" });
    }

    const productUpdate = await products.update(req.body, {
      where: { u_id: req.params.u_id },
    });

    // await transaction.commit();
    res.status(200).json({ success: true, data: productUpdate });
  } catch (error) {
    console.log("🚀 ~ updateProducts ~ error:", error);
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
      where: { u_id: req.params.u_id },
    });
    console.log("🚀 ~ deleteProducts ~ product:", product);

    if (!product) {
      res.status(404).json({ success: false, message: "not found" });
    }

    await products.destroy({
      where: { u_id: req.params.u_id },
    });

    // await transaction.commit();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log("🚀 ~ deleteProducts ~ error:", error);
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
