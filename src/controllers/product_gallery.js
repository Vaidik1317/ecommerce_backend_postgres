const { db } = require("../models");
const { gallery: productsGalleryModel } = db;
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { promises } = require("dns");
const { createClient } = require("@supabase/supabase-js");

// const formidable = require("formidable");

// Initialize Supabase client
const supabaseUrl = process.env.PG_DB_URI || "your-supabase-url";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "your-supabase-anon-key";
const supabase = createClient(supabaseUrl, supabaseKey);

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

    for (let file of files) {
      const generateName = generateNumber(10);
      let imageName =
        file.mimetype === "application/pdf"
          ? `PRO-IMG-${generateName}.pdf`
          : `PRO-IMG-${generateName}.png`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("images") // Replace 'images' with your bucket name
        .upload(imageName, file.data, {
          contentType: file.mimetype,
        });

      if (error) {
        console.error("Supabase upload error:", error);
        return res.status(500).json({ message: "Upload to Supabase failed" });
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(imageName);

      const publicUrl = publicUrlData.publicUrl;

      // Save file name to database (not full URL since bucket will be private)
      await productsGalleryModel.create({
        products_url: imageName,
        products_u_id: req.body.products_u_id,
      });
    }

    return res.status(201).json({ message: "success" });
  } catch (error) {
    console.log("🚀 ~ uploads ~ error:", error);
    res.status(500).json({ message: "error" });
  }
};
// fetch
const getGallery = async (req, res) => {
  try {
    const images = await productsGalleryModel.findAll({});

    // Generate signed URLs for each image
    const imagesWithSignedUrls = await Promise.all(
      images.map(async (image) => {
        const { data, error } = await supabase.storage
          .from("images")
          .createSignedUrl(image.products_url, 3600); // 1 hour expiration

        if (error) {
          console.error("Error creating signed URL:", error);
          return { ...image.dataValues, products_url: null }; // or handle error
        }

        return { ...image.dataValues, products_url: data.signedUrl };
      })
    );

    res.status(201).json({ success: true, data: imagesWithSignedUrls });
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
