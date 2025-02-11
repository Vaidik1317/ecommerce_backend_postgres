const { db } = require("../models");
const { gallery: productsGalleryModel } = db;
const path = require("path");
const multer = require("multer");
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
// const fileTypes = require("file-type");

// default options
// app.use(fileUpload());

// app.post("/upload", function (req, res) {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send("No files were uploaded.");
//   }

//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   let sampleFile = req.files.sampleFile;

//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv("/somewhere/on/your/server/filename.jpg", function (err) {
//     if (err) return res.status(500).send(err);

//     res.send("File uploaded!");
//   });
// });

// app.post("./uploads", fileUpload({ createParentPath: true }), (req, res) => {
//   const files = req.files;
//   console.log(files);

//   return res.json({ success: "logged", message: "logged" });
// });

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
    const filePath = `../uploads/${req.file.filename}`;
    await productsGalleryModel.create({
      products_url: filePath,
    });
    console.log(filePath, "uploaded images");
    // newGallery.save();
    res.status(200).json({ success: true, data: storage });
  } catch (error) {
    console.log("newGallery - error", error);
  }
};

// update
// const updateGallery = async (req, res) => {
//   try {
//   } catch (error) {}
// };

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: "100000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("something else");
  },
}).single("products_url");
module.exports.productsGalleryController = {
  getGallery,
  createGallery,
  upload,
};
