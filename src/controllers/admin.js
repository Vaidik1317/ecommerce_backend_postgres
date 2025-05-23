const sequelize = require("../db-connection");
const { db } = require("../models");
const { admin: adminModel } = db;

const getAdmin = async (req, res) => {
  try {
    const admin = await adminModel.findAll({});
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    console.log("Error in fetching:", error.message);
    res.status(500).json({ success: false, message: "Not found" });
  }
};

const createAdmin = async (req, res) => {
  try {
    const NewAdmin = await adminModel.create(req.body);
    res.status(201).json({ success: true, data: NewAdmin });
  } catch (error) {
    console.log("🚀 ~ createAdmin ~ error:", error);

    res.status(500).json({ success: false, message: "something went wrong" });
  }
};
const updateAdmin = async (req, res) => {
  console.log("🚀 ~ updateAdmin ~ updateAdmin:", req.body);
  // const transaction = await sequelize.transaction();

  try {
    const admin = await adminModel.findOne({
      where: { u_id: req.params.u_id },
    });

    if (!admin) {
      res.status(404).json({ success: false, message: "not found" });
    }

    const updateAdmin = await adminModel.update(req.body, {
      where: { u_id: req.params.u_id },
    });
    await admin.save();

    // await transaction.commit();
    res.status(201).json({ success: true, data: admin });
  } catch (error) {
    // await transaction.rollback();

    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

module.exports.adminController = {
  getAdmin,
  createAdmin,
  updateAdmin,
};
