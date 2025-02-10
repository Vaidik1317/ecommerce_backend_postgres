const sequelize = require("./db-connection");
// const app = require("express");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const { dbSync } = require("./sync");
const router = express.Router();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 7000;

app.get("/", function (req, res) {
  res.send("Welcome toFoodies choice");
});
requireRoutes(path.join(__dirname, "./routes"));

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
