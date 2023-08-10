const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User-name is required!!"],
    },
    email: {
      type: String,
      required: [true, "User Email is required!!"],
      unique: [true, "Email already exists!!"],
    },
    password: {
      type: String,
      required: [true, "User Password is required!!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
