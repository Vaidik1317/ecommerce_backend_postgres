const { sequelize } = require("./db-connection");
// const app = require("express");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const { dbSync } = require("./sync/index");
const fileUpload = require("express-fileupload");
const excelJs = require("exceljs");

const socket = require("socket.io");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();

const specs = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
      description: "for admin panel",
    },
    servers: [
      { url: "http://localhost:7000" },
      { url: "https://ecommerce-backend-postgres.onrender.com" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/api-doc/*.js"],
});
// app.use("/admin-api", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api-doc", swaggerUI.serveFiles(specs), swaggerUI.setup(specs));

const options = {
  filename: "./streamed-workbook.xlsx",
  useStyles: true,
  useSharedStrings: true,
};
const workbook = new excelJs.stream.xlsx.WorkbookWriter(options);

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("./uploads", express.static(path.join(__dirname, "../uploads")));

const PORT = process.env.PORT || 7000;

app.use(express.static("./view"));
app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/view/index.html");
});

// requireRoutes(path.join(__dirname, "./routes"));
requireRoutes(path.join(__dirname, "./routes/"));

const server = app.listen(PORT, async () => {
  console.log(`http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

function requireRoutes(dir) {
  fs.readdirSync(dir)
    .filter(
      (file) =>
        file !== "index.js" && file.endsWith(".js") && file !== "auth-logger.js"
    )
    .forEach((file) => require(path.join(dir, file))(app, router));
}
const io = socket(server, {
  transports: ["polling"],
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("home page");
  socket.on("disconnect", () => {});
});
// dbSync(); // Removed sync call - use migrations instead
module.exports = { app, io };
