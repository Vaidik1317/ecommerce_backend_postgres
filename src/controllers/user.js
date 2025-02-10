const { db } = require("../models");
const { user: user } = db;

const getUsers = async (req, res) => {
  try {
    const getUser = await user.findAll({});
    res.status(200).json({ success: true, data: getUser });
  } catch (error) {
    console.log("🚀 ~ getUsers ~ console:", console);
    res.status(500).json({ success: false, message: "Not found" });
  }
};

// create user

const createUsers = async (req, res) => {
  try {
    const createUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      pincode: req.body.pincode,
      gender: req.body.gender,
    });
    res.status(200).json({ success: true, data: createUser });
  } catch (error) {
    console.log("🚀 ~ createUsers ~ error:", error);
    res
      .status(500)
      .json({ success: false, message: "failed to create new user" });
  }
};

const updateUsers = async (req, res) => {
  try {
    const user = await user.findOne({
      where: { user_u_id: req.params.user_u_id },
    });

    if (!user) {
      res.state(404).json({ success: false, message: "not found" });
    }

    (user.name = req.body.name),
      (user.email = req.body.email),
      (user.password = req.body.password),
      (user.address = req.body.address),
      (user.city = req.body.city),
      (user.state = req.body.state),
      (user.country = req.body.country),
      (user.pincode = req.body.pincode),
      (user.gender = req.body.gender),
      await user.save({});

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const user = await user.findOne({
      where: { user_u_id: req.params.user_u_id },
    });

    if (!user) {
      res.status(404).json({ success: false, message: "not found" });
    }

    await user.destroy({
      where: { user_u_id: req.params.user_u_id },
    });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

module.exports.usersController = {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};
