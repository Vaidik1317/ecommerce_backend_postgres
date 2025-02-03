const sequelize = require("../db-connection");
const Order = require("../models/order");

const getOrders = async (req, res) => {
  try {
    const getOrder = await Order.findAll({});
    res.status(200).json({ success: true, data: getOrder });
  } catch (error) {
    console.log("Error in fetching all orders", error.message);
    res.status(500).json({ success: false, message: "Not found" });
  }
};

const deleteOrders = async () => {
  const transaction = await sequelize.transaction();

  try {
    const order = await Order.findOne({
      where: { order_id: req.params.order_id },
    });

    if (!order) {
      res.status(404).json({ success: false, message: "not found" });
    }

    await Order.destroy({
      where: { order_id: req.params.order_id },
    });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports.orderController = {
  getOrders,
  deleteOrders,
};
