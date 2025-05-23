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

    // if (!userData) {
    //   return res.state(404).json({ success: false, message: "not found" });
    // }

    // (userData.name = req.body.name),
    //   (userData.email = req.body.email),
    //   (userData.password = req.body.password),
    //   (userData.address = req.body.address),
    //   (userData.city = req.body.city),
    //   (userData.state = req.body.state),
    //   (userData.country = req.body.country),
    //   (userData.pincode = req.body.pincode),
    //   (userData.gender = req.body.gender),

    const UpdateUser = await user.update(req.body, {
      where: { u_id: req.params.u_id },
    });
    await userData.save();

    res.status(201).json({ success: true, data: UpdateUser });
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
    res.status(201).json({ success: true });
  } catch (error) {
    console.log("🚀 ~ deleteUsers ~ error:", error);

    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

const login = async (req, res) => {
  console.log("🚀 ~ login ~ login:", login);

  const data = ({ email, password } = req.body);

  console.log("🚀 ~ login ~ data:", data);

  try {
    const loginUser = await user.findOne({ where: { email: req.body.email } });

    console.log("🚀 ~ login ~ loginUser:", loginUser);
    if (!loginUser) {
      console.log("🚀 ~ login ~ loginUser:", loginUser);
      return res.status(404).json({ success: false, message: "not found" });
    }

    const isMatch = await bcrypt.compare(password, loginUser.password);
    console.log("🚀 ~ login ~ isMatch:", isMatch);

    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "invalid password" });
    }

    const token = jwt.sign({ userId: loginUser.u_id }, "012efgh", {
      expiresIn: "7h",
    });
    console.log("🚀 ~ login ~ token:", token);
    res.status(201).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
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
  exportUser,
};
