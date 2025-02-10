const { db } = require("../models");
const { gallery: productsGalleryModel } = db;
const { path } = require("path");
// const multer = require('multer')
// fetch
const getGallery = async (req, res) => {
  try {
    const getUrl = await productsGalleryModel.findAll({});
    res.status(200).json({ success: true, data: getUrl });
  } catch (error) {
    console.log("Error in fetching product gallery:", error.message);
    res.status(500).json({ success: false, message: "Not found" });
  }
};

// create
const createGallery = async (req, res) => {
  try {
    const newGallery = await productsGalleryModel.create({
      products_url: req.body.products_url,
    });
    newGallery.save();

    res.status(200).json({ success: true, data: newGallery });
    console.log(newGallery, "new images");
  } catch (error) {
    console.log("newGallery - error", error);
  }
};

// update
// const updateGallery = async (req, res) => {
//   try {
//   } catch (error) {}
// };

module.exports.productsGalleryController = {
  getGallery,
  createGallery,
};
