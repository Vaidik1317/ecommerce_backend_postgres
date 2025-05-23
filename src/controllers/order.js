// const { Where } = require("sequelize/lib/utils");
const { where } = require("sequelize");
const { db } = require("../models");
// const orderItems = require("../models/orderItems");
const { order: order } = db;
const { items: orderItemsModel } = db;
const { user: user } = db;
const { product: products } = db;
const { sendMail } = require("./sendMail");
const moment = require("moment");
const puppeteer = require("puppeteer");
const easyinvoice = require("easyinvoice");
const path = require("path");
const fs = require("fs");

// orderItem
const getOrders = async (req, res) => {
  try {
    const getOrder = await order.findAll({});
    res.status(200).json({ success: true, data: getOrder });
  } catch (error) {
    console.log("Error in fetching all orders", error.message);
    res.status(500).json({ success: false, message: "Not found" });
  }
};

const createOrders = async (req, res) => {
  console.log("🚀 ~ createOrders ~ createOrders:", req.body);

  try {
    for (let i = 0; i < req.body.order_item.length; i++) {
      const element = req.body.order_item[i];

      const productID = await products.findOne({
        where: { u_id: element.products_u_id },
      });

      if (
        !productID ||
        Number(productID?.quantity) <= 0 ||
        Number(productID?.quantity) - Number(element.quantity) < 0
      ) {
        return res
          .status(404)
          .json({ success: false, message: "product id not found" });
      }
    }

    const totalPrices = req.body.order_item.reduce((res, curr) => {
      return res + Number(curr.price) * Number(curr.quantity);
    }, 0);
    const createOrder = await order.create({
      user_u_id: req.body.user_u_id,
      // product_u_id: req.body.products_u_id,
      total_price: totalPrices,
      status: req.body.status,
      date: moment().format("YYYY/MM/DD"),
    });

    if (!createOrder) {
      res
        .status(404)
        .json({ success: false, message: "create order not found" });
    }

    const orderData = [];

    for (let i = 0; i < req.body.order_item.length; i++) {
      const data = req.body.order_item[i];

      const product = await products.findOne({
        where: { u_id: data.products_u_id },
      });

      const newQuantity = Number(product.quantity) - Number(data.quantity);

      await products.update(
        { quantity: newQuantity },
        {
          where: { u_id: data.products_u_id },
        }
      );

      orderData.push({
        products_u_id: data.products_u_id,
        price: data.price,
        order_u_id: createOrder.u_id,
        quantity: data.quantity,
      });
    }

    var userEmail = await user.findOne({
      where: { u_id: req.body.user_u_id },
    });
    console.log("🚀 ~ createOrders ~ userEmail:", userEmail);

    if (!userEmail) {
      return res
        .status(404)
        .json({ success: false, message: "user email not found" });
    }
    sendMail(
      userEmail.email,
      "welcome to our site ,Thank you for placing order",
      `Hi your order details are ${JSON.stringify(
        req.body.order_item
      )}, Thank you`
    );
    console.log("🚀 ~ createOrders ~ sendMail:", sendMail);
    // sendMail(
    //   email,
    //   "welcome to our site ,Thank you for placing order",
    //   `Hi order details are${orderData}, Thank you`
    // );
    res.status(200).json({ success: true, data: createOrder });

    await orderItemsModel.bulkCreate(orderData);
  } catch (error) {
    console.log("🚀 ~ createOrder ~ error:", error);
    res
      .status(500)
      .json({ success: false, message: "failed to create new order" });
  }
  // console.log("🚀 ~ createOrders ~ orderData:", orderData);
};

const deleteOrders = async () => {
  // const transaction = await sequelize.transaction();

  try {
    const order = await order.findOne({
      where: { order_id: req.params.order_id },
    });

    if (!order) {
      res.status(404).json({ success: false, message: "not found" });
    }

    await order.destroy({
      where: { order_id: req.params.order_id },
    });

    // await transaction.commit();
  } catch (error) {
    // await transaction.rollback();
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// const loadReport = async (req, res) => {
//   try {
//     const orderItems = await orderItemsModel.findOne({});
//     const rooms = await order.find({});
//     res.render("report", { orderItemsModel: orderItems, order: rooms });
//   } catch (error) {
//     res.status().send({ success: false, msg: error.message });
//   }
// };
// const invoicePdf = async (req, res) => {
//   console.log("🚀 ~ invoicePdf ~ invoicePdf:", req.body);
//   try {
//     const browser = await puppeteer.launch({});
//     const page = browser.newPage();
//     // await page.goto(`${req.protocol}://${req.get("host")}` + "/invoicePdf", {
//     //   waitUntil: "networkidle2",
//     await page.goto("http://localhost:7000/api/", {
//       waitUntil: "networkidle2",
//     });

//     await page.setViewport({ width: 1260, height: 780 });

//     const date = new Date();
//     const pdfn = page.pdf({
//       path: `${path.join(__dirname, "../uploads/files", date() + ".pdf")}`,
//       // printBackground: true,
//       formate: "A2",
//     });
//     console.log("🚀 ~ invoicePdf ~ pdfn:", pdfn);

//     await browser.close();

//     const pdfURL = path.join(__dirname, "../uploads/files", date() + ".pdf");
//     console.log("🚀 ~ invoicePdf ~ pdfURL:", pdfURL);

//     res.set({
//       "Content-Type": "application/pdf",
//       "Content-Length": pdfn.length,
//     });
//     res.render(pdfURL);
//   } catch (error) {
//     console.log("Error in generating pdf");
//   }
// };

const invoicePdf = async (req, res) => {
  console.log("🚀 ~ invoicePdf ~ invoicePdf:", req.body);
  // const order = await order.findById({});
  try {
    const data = await orderItemsModel.findOne({});
    if (!order) {
      return res.status(404).send("Order not found");
    }
    // console.log("🚀 ~ invoicePdf ~ data:", data);
    // console.log("🚀 ~ invoicePdf ~ data:", data);

    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    const content = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            padding: 20px;
            text-align: center;
            background-color: #f8f9fa;
        }
        .invoice-container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            background: white;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        h1 {
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        td {
            background-color: #f9f9f9;
        }
    </style>
    
  </head>
  <body>
  <table>
  <thead>
  <tr>
  <th>Order Id</th>
  <th>Price</th>
  <th>quantity</th>
  <th>created at</th>
  <th>updated_at</th>
  <th>Products Id</th>
  <th>Order Id</th>
  
    <tr>

      <td>${data.u_id}</td>
          <td>${data.price}</td>
          <td>${data.quantity}</td>
          <td>${data.created_at}</td>
          <td>${data.updated_at}</td>
          <td>${data.products_u_id}</td>
          <td>${data.order_u_id}</td>
    </tr>   

    }}
           
    
  </body>
</html>`;

    await page.setContent(content, {
      waitUntil: "networkidle2",
    });
    await page.setViewport({ width: 1260, height: 780 });

    const date = new Date().toISOString().replace(/[:.]/g, "-");
    const pdfPath = path.join(__dirname, "../uploads/files", `${date}.pdf`);

    const pdfn = await page.pdf({
      path: pdfPath,
      printBackground: true,
      format: "A2",
    });
    console.log("🚀 ~ invoicePdf ~ pdfn:", pdfn);

    await browser.close();

    console.log("🚀 ~ invoicePdf ~ pdfURL:", pdfPath);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfn.length,
    });
    res.sendFile(pdfPath);
  } catch (error) {
    console.log("Error in generating pdf", error);
    res.status(500).send("Error in generating PDF");
  }
};

// const invoicePdf = async (req, res) => {
//   try {
//     const data = await orderItemsModel.findOne({});

//     console.log("🚀 ~ invoicePdf ~ data:", data);
//     let result = await easyinvoice.createInvoice(data);
//     console.log("🚀 ~ invoicePdf ~ result:", result);
//     // w invoice pdf

//     fs.writeFileSync("../uploads" + ".pdf", result.pdf, "base64");

//     easyinvoice.download("myInvoice.pdf", result.pdf);
//   } catch (error) {
//     console.log("error in pdf creation");
//   }
// };

// const invoicePdf = async (req, res) => {
//   try {
//     const data = orderItemsModel.findAll({});
//     function createInvoice(data) {
//       const doc = new PDFDocument();

//       doc.pipe(fs.createWriteStream("../uploads/invoice.pdf"));

//       doc.fontSize(27).text("This the article for GeeksforGeeks", 100, 100);

//       doc
//         .addPage()
//         .fontSize(15)
//         .text("Generating PDF with the help of pdfkit", 100, 100);

//       doc.end();
//     }
//   } catch (error) {
//     console.log("error in pdf creation");
//   }
// };

module.exports.orderController = {
  getOrders,
  createOrders,
  deleteOrders,
  invoicePdf,
  // loadReport,
};
