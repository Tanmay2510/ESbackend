const mongoose = require("mongoose");
require('dotenv/config');
const connectDB = async () => {
  const MONGO_URI = process.env.DB_PWD;
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;