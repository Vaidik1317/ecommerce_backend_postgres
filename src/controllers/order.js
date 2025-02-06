const { Where } = require("sequelize/lib/utils");
const { db } = require("../models");
// const orderItems = require("../models/orderItems");
const { order: order } = db;
const { items: orderItemsModel } = db;
const { user: user } = db;
const { product: products } = db;

const moment = require("moment");
// const { where } = require("sequelize");4
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
  try {
    // order create
    // find each item
    // order item entry
    // update product new quantrity

    // order item array
    for (let i = 0; i < req.body.order_item.length; i++) {
      const element = req.body.order_item[i];

      const productID = await products.findOne({
        where: { u_id: element.product_u_id },
      });
      console.log("productID");

      // check if every item in order item has enough quantity
      if (productID < 0) {
        return res.status(404).json({ success: false, message: "not found" });
      }
    }

    for (const data of req.body.order_item) {
      const productID = await products.findOne({
        where: { u_id: data.product_u_id },
      });

      if (productID < 0) {
        return res.status(404).json({ success: false, message: "not found" });
      }
    }
    const createOrder = await order.create({
      user_u_id: req.body.user_u_id,
      product_u_id: req.body.products_u_id,
      total_price: req.body.total_price,
      status: req.body.status,
      date: moment().format("DD/MM/YYYY"),
    });

    if (!createOrder) {
      res.status(404).json({ success: false, message: "not found" });
    }

    const orderData = [];
    console.log(
      "🚀 ~ createOrders ~ req.body.order_item:",
      req.body.order_item
    );

    for (const data of req.body.order_item) {
      orderData.push({
        products_u_id: data.products_u_id,
        price: data.price,
        order_u_id: createOrder.u_id,
        quantity: data.quantity,
      });
    }
    console.log("🚀 ~ createOrders ~ orderData:", orderData);

    await orderItemsModel.bulkCreate(orderData);

    res.status(200).json({ success: true, data: createOrder });

    orderItemsModel.update(req.body.order_item, {
      where: { quantity: req.body.quantity++ },
    });
  } catch (error) {
    console.log("🚀 ~ createOrder ~ error:", error);
    res
      .status(500)
      .json({ success: false, message: "failed to create new order" });
  }
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

    await Order.destroy({
      where: { order_id: req.params.order_id },
    });

    // await transaction.commit();
  } catch (error) {
    // await transaction.rollback();
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports.orderController = {
  getOrders,
  createOrders,
  deleteOrders,
};
