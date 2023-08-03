const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(
      `DB connected: ${connect.connection.host}/${connect.connection.name}`
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
