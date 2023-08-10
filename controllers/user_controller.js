const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a User
//@Route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(400);
    throw new Error("All fields are required!!");
  }

  //check email
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    res.status(400);
    throw new Error("Email already exists!!");
  }

  //HASH Password
  const hashedPassword = await bcrypt.hash(password, 10);

  const registration = await User.create({
    username,
    password: hashedPassword,
    email,
  });

  const user = await User.findOne({ _id: registration._id }, { password: 0 });
  res.status(201).json(user);
});

//@desc Login a User
//@Route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "login" });
});

//@desc Register a User
//@Route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "current user" });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
