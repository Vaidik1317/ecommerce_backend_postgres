const sequelize = require("../db-connection");
const Admin = require("../models/admin");

const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find({});
    res.status(200).json({ success: true, data: getProduct });
  } catch (error) {
    console.log("Error in fetching:", error.message);
    res.status(500).json({ success: false, message: "Not found" });
  }
};

const updateAdmin = async (req, res) => {
  // const transaction = await sequelize.transaction();

  try {
    const admin = await Admin.findOne({
      where: { u_id: req.params.u_id },
    });

    if (!admin) {
      res.status(404).json({ success: false, message: "not found" });
    }

    (admin.name = req.body.name),
      (admin.mobile = req.body.mobile),
      (admin.email = req.body.email),
      (admin.password = req.body.password),
      await admin.save({ transaction });

    // await transaction.commit();
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    // await transaction.rollback();

    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

module.exports.adminController = {
  getAdmin,
  updateAdmin,
};
