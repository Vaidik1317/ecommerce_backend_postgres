// const { Where } = require("sequelize/lib/utils");
const { db } = require("../models");
// const orderItems = require("../models/orderItems");
const { order: order } = db;
const { items: orderItemsModel } = db;
const { user: user } = db;
const { product: products } = db;

const moment = require("moment");

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
        return res.status(404).json({ success: false, message: "not found" });
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
      date: moment().format("DD/MM/YYYY"),
    });

    if (!createOrder) {
      res.status(404).json({ success: false, message: "not found" });
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

    res.status(200).json({ success: true, data: createOrder });

    await orderItemsModel.bulkCreate(orderData);
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

    await order.destroy({
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
