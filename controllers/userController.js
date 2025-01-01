const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//create user
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //check existing user
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: "user already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    //saving user details
    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "user created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "error creating user",
    });
  }
};

//login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "email not found",
      });
    }
    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "failed",
        message: "invalid credentials",
      });
    }
    //generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    res.status(201).json({
      status: "success",
      message: "Login Scuccesful",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

//update user
exports.updateUser = async (req, res) => {
  const updateFeilds = req.body;
  try {
    //get user id from token
    const userId = req.user.id;
    console.log(userId);
    //update userfield
    const [updateRowCount] = await User.update(updateFeilds, {
      where: { id: userId },
    });

    //check if row was updated
    if (updateRowCount === 0) {
      return res.status(404).json({
        status: "failed",
        message: "no user found with given id",
      });
    }
    res.status(201).json({
      status: "success",
      message: "user updated succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Interna server error");
  }
};
