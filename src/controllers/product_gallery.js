const { db } = require("../models");
const { gallery: productsGalleryModel } = db;
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { promises } = require("dns");

// const formidable = require("formidable");

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

    if (!req.files || !req.files.products_url) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let files = Array.isArray(req.files.products_url)
      ? req.files.products_url
      : [req.files.products_url];

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

    for (let file of files) {
      const generateName = generateNumber(10);
      let imageName =
        file.mimetype === "application/pdf"
          ? `PRO-IMG-${generateName}.pdf`
          : `PRO-IMG-${generateName}.png`;
      if (!fs.existsSync("public/upload")) {
        fs.mkdirSync("public/upload", { recursive: true });
      }

      // for()
      await new Promise((resolve, reject) => {
        file.mv(`public/upload/${imageName}`, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      // ✅ Check for missing `products_u_id`
      // if (!req.body.products_u_id) {
      //   return res.status(400).json({ message: "Missing products_u_id" });
      // }

      await productsGalleryModel.create({
        products_url: `public/upload/` + imageName,
        // products_u_id: req.body.products_u_id,
      });
    }

    return res.status(201).json({ message: "success" });
  } catch (error) {
    console.log("🚀 ~ .replace ~ error:", error);
  }
  // if (req.files.products_url > 10) {
  //   images = `${req.files.products_url.substring(0, 20).replace(".", "_")}_.${
  //     req.files.products_url.split(".")[1]
  //   }`;
  //   console.log(images, "imagess");
  // }

  res.status(500).json({ message: "error" });
  // console.log("🚀 ~ products_url:", products_url);
};
// fetch
const getGallery = async (req, res) => {
  try {
    const getUrl = await productsGalleryModel.findAll({});

    // console.log("🚀 ~ getGallery ~ getUrl:", getUrl);
    res.status(201).json({ success: true, data: getUrl });
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
