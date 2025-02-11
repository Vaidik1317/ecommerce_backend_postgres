const sequelize = require("./db-connection");
// const app = require("express");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const { dbSync } = require("./sync");
const router = express.Router();
const http = require("http");
const fileUpload = require("express-fileupload");
const formidable = require("formidable");
const { productsGalleryController } = require("./controllers/product_gallery");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// static

app.use("./uploads", express.static(path.join(__dirname, "../uploads")));
const PORT = process.env.PORT || 7000;

// http.createServer(function (req, res) {
//   if (req.url == "/uploads") {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//       var oldpath = files.filetoupload.filepath;
//       var newpath = "C:/Users/Your Name/" + files.filetoupload.originalFilename;
//       fs.rename(oldpath, newpath, function (err) {
//         if (err) throw err;
//         res.write("File uploaded and moved!");
//         res.end();
//       });
//     });
//   } else {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write(
//       '<form action="fileupload" method="post" enctype="multipart/form-data">'
//     );
//     res.write('<input type="file" name="filetoupload"><br>');
//     res.write('<input type="submit">');
//     res.write("</form>");
//     return res.end();
//   }
// });

app.get("/", function (req, res) {
  res.send("Welcome toFoodies choice");
});
requireRoutes(path.join(__dirname, "./routes"));

// app.post("./uploads", fileUpload({ createParentPath: true }), (req, res) => {
//   const files = req.files;
//   console.log(files);

//   return res.json({ success: "logged", message: "logged" });
// });
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

function requireRoutes(dir) {
  fs.readdirSync(dir)
    .filter(
      (file) =>
        file !== "index.js" && file.endsWith(".js") && file !== "auth-logger.js"
    )
    .forEach((file) => require(path.join(dir, file))(app, router));
}

dbSync();
