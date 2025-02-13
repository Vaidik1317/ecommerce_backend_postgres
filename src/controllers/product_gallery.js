const { db } = require("../models");
const { gallery: productsGalleryModel } = db;
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { promises } = require("dns");

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

// const uploads = async (req, res) => {
//   console.log("🚀 ~ uploads ~ uploads:", req.files);
//   if (!req.files) {
//     res.status(400).json({ message: "bad request" });
//     return;
//   }

//   let images = req.files.products_url;
//   console.log("🚀 ~ uploads ~ images:", images);
//   const uploadPath = path.join(__dirname + "../uploads" + images.products_url);
//   console.log("🚀 ~ uploads ~ uploadPath:", uploadPath + images);

//   if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath, { recursive: true });
//   }

//   const data = images.mv(uploadPath, (err) => {
//     productsGalleryModel.create({
//       products_url: req.uploads,
//     });

//     console.log("🚀 ~ images.mv ~ products_url:", data);
//     if (!err) {
//       products_url.push(`../uploads/${req.uploadedFile}`);
//     }
//   });

//   if (req.files.products_url > 10) {
//     images = `${req.files.products_url.substring(0, 20).replace(".", "_")}_.${
//       req.files.products_url.split(".")[1]
//     }`;
//     console.log(images, "imagess");
//   }

//   try {
//     fs.readFileSync("../uploads", (err, data) => {
//       if (err) throw new error(err);
//       if (data) {
//         fs.rename(
//           `../uploads/${data[0]}`,
//           `../uploads/${images}`,
//           (renameErr) => {
//             if (renameErr) throw new Error(renameErr);
//             if (!renameErr) {
//               return res.status(200).json({ success: true, products_url: "" });
//             } else {
//               return res.status(404).json({ success: false, products_url: "" });
//             }
//           }
//         );
//       }
//     });
//   } catch (error) {
//     console.log("🚀 ~ .replace ~ error:", error);
//   }

//   // res.status(200).json({ message: "ok" });
// };

// const uploads = async (req, res) => {
//   console.log("🚀 ~ uploads ~ uploads:", req.files);

//   if (!req.files) {
//     res.status(400).json({ message: "bad request" });
//     return;
//   }

//   let images = req.files.products_url;
//   console.log("🚀 ~ uploads ~ images:", images);

//   if (req.files.products_url > 10) {
//     images = `${req.files.products_url.substring(0, 20).replace(".", "_")}_.${
//       req.files.products_url.split(".")[1]
//     }`;
//     console.log(images, "imagess");
//   }

//   try {
//     fs.readFileSync("../uploads", (err, data) => {
//       if (err) throw new error(err);
//       if (data) {
//         fs.rename(
//           `../uploads/${data[0]}`,
//           `../uploads/${images}`,
//           (renameErr) => {
//             if (renameErr) throw new Error(renameErr);
//             if (!renameErr) {
//               return res
//                 .status(200)
//                 .json({ success: true, products_url: images });
//             } else {
//               return res.status(404).json({ success: false, products_url: "" });
//             }
//           }
//         );
//       }
//     });
//   } catch (error) {
//     console.log("🚀 ~ .replace ~ error:", error);
//   }

//   // res.status(200).json({ message: "ok" });
// };

const generateNumber = (length) => {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const uploads = async (req, res) => {
  try {
    console.log("🚀 ~ uploads ~ uploads:", req.files.products_url);

    if (!req.files) {
      res.status(400).json({ message: "bad request" });
      return;
    }

    // let images = Date.now() + "_" + req.files.products_url;
    // const newPath = path.join(process.cwd(), "test", images);
    // console.log("🚀 ~ uploads ~ images:", images);
    // req.files.products_url.mv(newPath);

    // if (
    //   req.files.products_url.mimetype === "image/jpg" ||
    //   req.files.products_url.mimetype === "image/png" ||
    //   req.files.products_url.mimetype === "image/jpeg" ||
    //   req.files.products_url.mimetype === "application/pdf"
    // ) {
    for (let i = 0; i < req.files.products_url.length; i++) {
      const generateName = generateNumber(10);
      let imageName;
      if (req.files.products_url[i].mimetype === "application/pdf") {
        imageName = `PRO-IMG-` + generateName + ".pdf";
      } else {
        imageName = "PRO-IMG" + generateName + ".png";
      }

      if (!fs.existsSync("public/upload")) {
        fs.mkdirSync("public/upload", { recursive: true });
      }

      // for()
      await new Promise(function (resolve, reject) {
        req.files.products_url[i].mv(
          `public/upload/` + imageName,

          async function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(null);
            }
          }
        );
      });

      await productsGalleryModel.create({
        products_url: `public/upload/` + imageName,
        products_u_id: req.body.products_u_id,
      });
    }

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log("🚀 ~ .replace ~ error:", error);
  }
  // if (req.files.products_url > 10) {
  //   images = `${req.files.products_url.substring(0, 20).replace(".", "_")}_.${
  //     req.files.products_url.split(".")[1]
  //   }`;
  //   console.log(images, "imagess");
  // }

  res.status(200).json({ message: "error" });
  // console.log("🚀 ~ products_url:", products_url);
};
// fetch
const getGallery = async (req, res) => {
  try {
    const getUrl = await productsGalleryModel.findAll({});

    console.log("🚀 ~ getGallery ~ getUrl:", getUrl);
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
  // generateNumber,
  uploads,
};
