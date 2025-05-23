const request = require("supertest");
const { app } = require("../index");
const { db } = require("../models");
const { user: user, gallery: productsGalleryModel } = db;
const express = require("express");
// const dbSync = require("./sync/index");
const { sequelize } = require("../models");
const { PassThrough } = require("supertest/lib/test");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
//
var categoryId;
let galleryId;
let userId;
let productId;
let userPassword = "12345678";
let adminId;
let dataId;
let product_url;

app.use("./uploads", express.static(path.join(__dirname, "../uploads")));

// beforeAll(async () => {
//   console.log(" Syncing test database...");
//   await sequelize.sync({ force: true });
//   console.log(" Test database is ready!");
// });

// afterAll(async () => {
//   console.log("🗑 Dropping all tables...");
//   await sequelize.drop(); // Drop all tables after tests
//   console.log("✅ Test database cleanup done!");
// });

// get category
describe("Product category", () => {
  it("Get product category and it should return a 200", async () => {
    const res = await request(app).get("/getProductsCategory");
    expect(res.status).toBe(200);
  });
  it("Get product category and it should return a 500", async () => {
    const res = await request(app).get("/getProductsCategory");
    if (res == "") {
      expect(res.status).toBe(500);
    }
    // expect(res.status).toBe(500);
  });

  it("should return a 500 if category name is empty", async () => {
    const res = await request(app).post("/createProductsCategory");
    expect(res.status).toBe(500);
  });

  it("should return a 404 if category name is not found", async () => {
    const res = await request(app).get(`/updateProductsCategory/${categoryId}`);

    expect(res.status).toBe(404);
  });

  it.only("should return a 201", async () => {
    const res = await request(app)
      .post("/createProductsCategory")
      .send({ name: "ghfghgf4erfgghjph" });
    categoryId = res._body.data.u_id;
    console.log("🚀 ~ it ~ categoryId:", categoryId);
    console.log("🚀 ~ it.only ~ res:", res);
    expect(res.status).toBe(201);
  });

  it("should return a 201   ", async () => {
    const res = await request(app)
      .put(`/updateProductsCategory/${categoryId}`)
      .send({
        userID: "1",
        name: "name12354hhpgl",
      });
    expect(res.status).toBe(201);
  });

  it("should return a 200", async () => {
    const res = await request(app).del(`/deleteProductsCategory/${categoryId}`);

    expect(res.status).toBe(200);
  });
});

// category add 201 -DONE
// describe("category add", () => {});

/*when create category store id in variable and use it in other test*/
// category update - 201

// describe("Update Product Category", () => {});

// // delete api category
/* Use this in last test  and make delete with ids*/
// describe("category delete", () => {});

describe("Product gallery", () => {
  it("should return a 201", async () => {
    const res = await request(app).get("/getGallery");
  });

  const filePath = `$(./uploads", express.static(path.join(__dirname, "../uploads/1739249845787.png"))`;
  console.log("🚀 ~ describe ~ filePath:", filePath);

  it("should upload file ", async () => {
    if (!fs.existsSync("public/upload")) {
      fs.mkdirSync("public/upload", { recursive: true });
    }
    return (
      request(app)
        .post("/createGallery")
        .attach("files", filePath)
        // .create("products_url", filePath)

        .then((res) => {
          const { success, message, filePath } = res.body;
          expect(success).toBeTruthy();
          expect(message).toBe("Uploaded successfully");
          expect(typeof filePath).toBeTruthy();
          product_url = filePath;
          console.log("🚀 ~ .then ~ imageName:", imageName);
          expect(res.status).toBe(201);
        })
        .catch((err) => console.log(err))
    );
  });

  it("should return image", async () => {
    const res = await request(app).get("/getGallery");
    products_url = await productsGalleryModel.findAll();

    console.log("🚀 ~ it.only ~ image:", products_url);
    expect(res.status).toBe(201);
  });

  // it("image upload model", async () => {
  //   const res = await request(app)
  //     .post("/createGallery")
  //     .attach("image", filePath / test.png);
  //   const generateNumber = (length) => {
  //     let result = "";
  //     const characters = "0123456789";
  //     const charactersLength = characters.length;
  //     for (let i = 0; i < length; i++) {
  //       result += characters.charAt(
  //         Math.floor(Math.random() * charactersLength)
  //       );
  //     }

  //     return result;
  //   };

  //   for (let i = 0; i < res.files.products_url.length; i++) {
  //     const generateName = generateNumber(10);
  //     let imageName;
  //     if (res.files.products_url[i].mimetype === "application/pdf") {
  //       imageName = `PRO-IMG-` + generateName + ".pdf";
  //     } else {
  //       imageName = "PRO-IMG" + generateName + ".png";
  //     }

  //     if (!fs.existsSync("public/upload")) {
  //       fs.mkdirSync("public/upload", { recursive: true });
  //     }

  //     // for()
  //     await new Promise(function (resolve, reject) {
  //       res.files.products_url[i].mv(
  //         `public/upload/` + imageName,

  //         async function (err) {
  //           if (err) {
  //             reject(err);
  //           } else {
  //             resolve(null);
  //           }
  //         }
  //       );
  //     });

  //     await productsGalleryModel.create({
  //       products_url: `public/upload/` + imageName,
  //       products_u_id: req.body.products_u_id,
  //     });
  //   }
  // });
});

describe("image upload gpt", () => {
  it("should upload image gpt", async () => {});
  it.only("should upload a single image and return 201 gpt", async () => {
    const filePath = path.join(__dirname, "test-image.png");
    console.log("🚀 ~ it.only ~ filePath:", filePath);

    const res = await request(app)
      .post("/createGallery") // Ensure this matches your API route
      .set("Content-Type", "multipart/form-data")
      .attach("products_url", filePath);
    // .field("products_u_id", "test-product-id");

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "success");
  });

  // it.only("should return 400 if no file is uploaded", async () => {
  //   const res = await request(app)
  //     .post("/upload")
  //     .set("Content-Type", "multipart/form-data")
  //     .field("products_u_id", "test-product-id");

  //   expect(res.status).toBe(400);
  //   expect(res.body).toHaveProperty("message", "bad request");
  // });
});
describe("Products", () => {
  it("should return a 200", async () => {
    const res = await request(app).get("/getProducts");
    expect(res.status).toBe(200);
  });

  it.only("should create products and return 201", async () => {
    const res = await request(app)
      .post("/createProducts")

      .send({
        name: "test1 prodfuf3ct12",
        description: "test data",
        price: 10000,
        quantity: 150,
        products_category_u_id: `${categoryId}`,
      });
    // productId = res._body.data.u_id;
    console.log("🚀 ~ .then ~ res:", res);
    console.log("🚀 ~ it ~ productId:", productId);
  });

  // product_url error
});

describe("Order", () => {
  it("should return a 200", async () => {
    const res = await request(app).get("/getOrder");
    expect(res.status).toBe(200);
  });
  // it("should return a 200", async () => {
  //   const res = await request(app).get("/invoicePdf");
  //   expect(res.status).toBe(200);
  // });

  // it.only("create order and should return 201", async () => {
  //   const res = await request(app).post("/createOrders").send({
  //     user_u_id: "5024ebb5-79cd-4ade-95c9-f8a3207327dc",
  //     status: "true",
  //   });
  //   expect(res.status).toBe(201);
  // });

  it("should create order and return 201", async () => {
    const res = await request(app)
      .post("/createOrders")
      .send({
        products_u_id: `${productId}`,
        price: 1200,
        quantity: 1,
        status: "accept",
        user_u_id: `${userId}`,
      });
  });
});

describe("User", () => {
  it("Get the all user details and it should return a 200", async () => {
    const res = await request(app).get("/getUsers");
    expect(res.status).toBe(200);
  });
  // it.only("get all the user", async () => {
  //   const res = await request(app).get("/getUsers");
  //   console.log("🚀 ~ it.only ~ res:", res);
  //   const getUser = await user.findAll({});
  //   expect(res.body).toBe(getUser);
  // });

  it("Create  user and login user and it should return a 201", async () => {
    const res = await request(app).post("/createUsers").send({
      name: "name12gfr34",
      email: "emailf1hghg4@gmail.com",
      password: userPassword,
      address: "address123",
      city: "city",
      state: "state",
      country: "country",
      pincode: "2322434",
      gender: "male",
    });
    // console.log("🚀 ~ res ~ res:", res);

    userId = res._body.data.u_id;
    console.log("🚀 ~ it.only ~ userId:", userId);

    userPassword = res._body.data.password;
    console.log("🚀 ~ it.only ~ userPassword:", userPassword);

    expect(res.status).toBe(201);

    let hashedPassword = res._body.data.password;
    console.log("🚀 ~ it.only ~ hashedPassword:", hashedPassword);
    // expect(hashedPassword).not.toBe(userPassword);

    const isMatch = await bcrypt.compare(hashedPassword, userPassword);
    console.log("🚀 ~ it.only ~ isMatch:", isMatch);

    await request(app).post("/login").send({
      email: "email1hhg4@gmail.com",
      password: userPassword,
    });
    expect(res.status).toBe(201);
    console.log("🚀 ~login it ~ res:", res);

    console.log("🚀 ~ it.only ~ expect:", expect);
  });

  it("Update user by single id and it should return a 201", async () => {
    const res = await request(app).put(`/updateUsers/${userId}`).send({
      name: "updated User name1",
    });
  });

  it("delete user by single id and should return 201", async () => {
    const res = await request(app).del(`/deleteUsers/${userId}`);
  });
});

// });

// it.only("Export all user data in csv and it should return a 200", async () => {
//   const res = await request(app).get("/exportUser");
//   expect(res.status).toBe(200);
// });

describe("Admin", () => {
  it("create new admin and it should return a 201", async () => {
    const res = await request(app).post("/createAdmin").send({
      name: "admin1",
      mobile: "1234567890",
      email: "admin1@gmail.",
      password: "password123",
    });

    adminId = res._body.data.u_id;
    console.log("🚀 ~ it.only ~ adminId:", adminId);

    expect(res.status).toBe(201);
  });

  it("Get all admin details and it should return a 200", async () => {
    const res = await request(app).get("/getAdmin");
    expect(res.status).toBe(200);
  });

  it("Update user by id and it should return a 200", async () => {
    const res = await request(app).put(`/updateAdmin/${adminId}`).send({
      userID: "1",
      name: "admin123",
    });
    expect(res.status).toBe(201);
  });
});
// afterAll(async () => {
//   console.log("🗑 Dropping all tables...");
//   await db.resetDatabase();
//   console.log("Test database cleanup done");
// });
