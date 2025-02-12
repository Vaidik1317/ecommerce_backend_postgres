const { db } = require("../models");
const { gallery: productsGalleryModel } = db;
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { error } = require("console");
// const formidable = require("formidable");

// const uploads = (req, file, res) => {
//   try {
//     console.log(req);

//     if (req.files && Object.keys(req.files).length !== 0) {
//       const uploadedFile = req.files.uploadedFile;

//       console.log(uploadedFile, " uploadedFile");

//       const uploadPath = __dirname + "../uploads" + uploadedFile.products_url;
//       console.log("🚀 ~ uploads ~ uploadPath:", uploadPath);

//       if (!fs.existsSync(uploadPath)) {
//         fs.mkdirSync(uploadPath, { recursive: true });
//       }
//       uploadedFile.mv(uploadPath, (err) => {
//         // productsGalleryModel.create({
//         //   products_url: req.fileUpload,
//         // });

//         if (err) {
//           console.log(err);
//           res.send("Failed !!");
//         }
//         // if (!err) {
//         //   products_url.push(`../uploads/${req.uploadedFile}`);
//         // }
//         else {
//           res.send("Successfully Uploaded !!");
//         }
//       });
//     } else res.send("no file uploaded");
//   } catch (error) {
//     console.log("🚀 ~ uploads ~ error:", error);
//   }
// };

const uploads = async (req, res) => {
  console.log("🚀 ~ uploads ~ uploads:", req.files);

  if (!req.files) {
    res.status(400).json({ message: "bad request" });
    return;
  }

  let images = req.files.products_url;
  if (req.files.products_url > 20) {
    images = `${req.files.uploads.products_url
      .substring(0, 20)
      .replace(".", "_")}_.${req.files.products_url.split(".")[1]}`;
    console.log(images);
  }
  try {
    fs.readFileSync("../uploads", (err, data) => {
      if (err) throw new error(err);
      if (data) {
        fs.rename(
          `../uploads/${data[0]}`,
          `../uploads/${images}`,
          (renameErr) => {
            if (renameErr) throw new Error(renameErr);
            if (!renameErr) {
              return res
                .status(200)
                .json({ success: true, products_url: images });
            } else {
              return res.status(404).json({ success: false, products_url: "" });
            }
          }
        );
      }
    });
  } catch (error) {
    console.log("🚀 ~ .replace ~ error:", error);
  }

  // res.status(200).json({ message: "ok" });
};
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
// const createGallery = async (req, res) => {
//   try {
//     fs.readdir("../uploads", (err, data) => {
//       if (err) throw new Error(err);
//       if (data) {
//         fs.rename(`../uploads/${data[0]}`);
//       }
//     });
//     let filename = path.join(__dirname, "../uploads");
//     const filePath = `../uploads/${filename}`;
//     await productsGalleryModel.create({
//       products_url: req.uploads,
//     });
//     console.log(filePath);

//     res.status(200).json({ success: true, data: filePath });
//   } catch (error) {
//     console.log("newGallery - error", error);
//   }
// };
module.exports.productsGalleryController = {
  getGallery,
  // createGallery,
  uploads,
};
