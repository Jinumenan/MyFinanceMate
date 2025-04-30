const mongoose = require("mongoose");
const { mongo_url } = require("./env");

const connectDB = async () => {
    const mongo_url = process.env.MONGO_URI; // Access MONGO_URI from environment variables
    if (!mongo_url) {
      console.error(
        "MONGO_URI is not defined. Please check your environment variables."
      );
      process.exit(1);
    }
  
    try {
      await mongoose.connect(mongo_url);
      console.log("Connected to MongoDB ");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err.message);
      console.error(err.stack);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;