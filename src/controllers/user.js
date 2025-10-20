const { db } = require("../models");
const jwt = require("jsonwebtoken");
const { user: user } = db;
const bcrypt = require("bcryptjs");
const cron = require("node-cron");
const { sendMail } = require("./sendMail");
const excelJs = require("exceljs");
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
const createUsers = async (req, res, next) => {
  console.log("🚀 ~ createUsers ~ createUsers:", req.body);
  const {
    name,
    email,
    password,
    number,
    address,
    city,
    state,
    country,
    pincode,
    gender,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const createUser = await user.create({
      name,
      email,
      password: hashedPassword,
      number,
      address,
      city,
      state,
      country,
      pincode,
      gender,
    });

    await createUser.save();

    // sendMail(
    //   email,
    //   "welcome to Ecommerce project",
    //   `Hi${name}Thank you for Register`
    // );
    // console.log("🚀 ~ createUsers ~ sendMail:", sendMail);
    res.status(201).json({ success: true, data: createUser });
  } catch (error) {
    console.log("🚀 ~ createUsers ~ error:", error);
    res
      .status(500)
      .json({ success: false, message: "failed to create new user" });
  }
};

const updateUsers = async (req, res) => {
  console.log("🚀 ~ updateUsers ~ updateUsers:", req.body);
  try {
    const userData = await user.findOne({ where: { u_id: req.params.u_id } });

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const UpdateUser = await user.update(req.body, {
      where: { u_id: req.params.u_id },
    });

    res.status(200).json({ success: true, data: UpdateUser });
  } catch (error) {
    console.log("🚀 ~ updateUsers ~ error:", error);

    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const userdata = await user.findOne({
      where: { u_id: req.params.u_id },
    });

    if (!user) {
      res.status(404).json({ success: false, message: "not found" });
    }

    await user.destroy({
      where: { u_id: req.params.u_id },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("🚀 ~ deleteUsers ~ error:", error);

    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginUser = await user.findOne({ where: { email } });

    if (!loginUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, loginUser.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // Create JWT token with user ID and email
    const token = jwt.sign(
      { userId: loginUser.u_id, email: loginUser.email },
      process.env.JWT_SECRET || "012efgh",
      {
        expiresIn: "7h",
      }
    );

    // Create refresh token (longer expiry)
    const refreshToken = jwt.sign(
      { userId: loginUser.u_id },
      process.env.JWT_REFRESH_SECRET || "refresh_secret_012efgh",
      {
        expiresIn: "30d",
      }
    );

    // Prepare user data to send back (omit sensitive info like password)
    const userData = {
      u_id: loginUser.u_id,
      name: loginUser.name,
      email: loginUser.email,
      number: loginUser.number,
      address: loginUser.address,
      city: loginUser.city,
      state: loginUser.state,
      country: loginUser.country,
      pincode: loginUser.pincode,
      gender: loginUser.gender,
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userData,
      token,
      refreshToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Error logging in" });
  }
};

// Refresh token endpoint
const refreshToken = async (req, res) => {
  const { refreshToken: token } = req.body;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET || "refresh_secret_012efgh"
    );
    const loginUser = await user.findOne({ where: { u_id: decoded.userId } });

    if (!loginUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Generate new access token
    const newToken = jwt.sign(
      { userId: loginUser.u_id, email: loginUser.email },
      process.env.JWT_SECRET || "012efgh",
      {
        expiresIn: "7h",
      }
    );

    res.status(200).json({
      success: true,
      token: newToken,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(401).json({ success: false, message: "Invalid refresh token" });
  }
};

// Logout endpoint (for cleanup if needed)
const logout = async (req, res) => {
  // With JWT, logout is mainly client-side
  // But you could implement token blacklisting here if needed
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

const getUserOrders = async (req, res) => {
  try {
    // Get user ID from JWT token (assuming middleware sets req.user)
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { order: orderModel } = require("../models").db;

    const userOrders = await orderModel.findAll({
      where: { user_u_id: userId },
      include: [
        {
          model: require("../models").db.items,
          include: [
            {
              model: require("../models").db.product,
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]], // Most recent orders first
    });

    res.status(200).json({ success: true, data: userOrders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

const exportUser = async (req, res) => {
  try {
    const users = await user.findAll({});
    // console.log("🚀 ~ exportUser ~ users:", users);

    const workbook = new excelJs.Workbook();
    // console.log("🚀 ~ exportUser ~ workbook:", workbook);

    const worksheet = workbook.addWorksheet("My user");
    // console.log("🚀 ~ exportUser ~ worksheet:", worksheet);
    worksheet.columns = [
      {
        header: "User",
        key: "user_u_id",
      },
      {
        header: "name",
        key: "name",
      },
      {
        header: "email",
        key: "email",
      },
      {
        header: "password",
        key: "password",
      },
      {
        header: "number",
        key: "number",
      },
      {
        header: "address",
        key: "address",
      },
      {
        header: "city",
        key: "city",
      },
      {
        header: "state",
        key: "state",
      },
      { header: "Country", key: "country" },
      { header: "Pincode", key: "pincode" },
      { header: "Gender", key: "gender" },
    ];
    // console.log("🚀 ~ exportUser ~ worksheet.columns:", worksheet.columns);

    // const userData = await user.find({});
    // console.log("🚀 ~ exportUser ~ userData:", userData);

    users.forEach((user) => {
      worksheet.addRow(user.dataValues);
    });

    worksheet.getRow(2).eachCell((cell) => {
      cell.font = { color: { rgb: "#004e47cc" } };
      // cell.font = { bold: true};
      // cell.body = { color: red };
    });

    worksheet.addRow([
      "My user",
      {
        text: "image",
        hyperlink: "http://something.com",
        font: { backgroundcolor: { argb: "004e47cc" } },
      },
    ]);
    // worksheet.eachRow(function(row, 2))
    // const range = workbook.sheet("My user").usedRange();

    // range.style({
    //   bold: true,
    // });
    // console.log("🚀 ~ exportUser ~ range:", range);

    // worksheet.style({
    //   bold: true,
    //   color: red,
    // });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader("Content-Disposition", "attachment; filename=Alluser.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: "Error in export user" });
  }
};
module.exports.usersController = {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  login,
  refreshToken,
  logout,
  getUserOrders,
  exportUser,
};
