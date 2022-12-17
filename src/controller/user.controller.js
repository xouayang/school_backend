const userModel = require("../model/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.sign_Up = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400)
      throw new Error("The body is not empty");
    } else {
      const user = await userModel.findOne({ email });
      if (user) {
        res.status(200)
        throw new Error("User already exists");
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const returnData = {
        ...req.body,
        password: hashPassword,
      };
      const createUser = await userModel.create(returnData);
       res.status(201).json(createUser);
    }
  } catch (error) {
    return res.status().json({ message: error.message });
  }
});
exports.sign_In = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400)
      throw new Error("The body is not empty");
    } else {
      const checking = await userModel.findOne({ email });
      if (checkingEmail && bcrypt.compare(password, checking.password)) {
        jwt.sign(
          {
            user: {
              checking: checking.email,
              checking: checking.password,
            },
          },
          process.env.API_KEY,
          { expiresIn: "5m" }
        );
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
