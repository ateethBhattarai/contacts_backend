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
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required!!");
  }

  const user = await User.findOne({ email });

  //check if user exists and also compare password with hashed-password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is invalid!!");
  }
});

//@desc Register a User
//@Route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(userDetails);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
