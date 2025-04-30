const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5001;
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
const MONGO_URI = process.env.MONGO_URI;
// const EXCHANGE_API_KEY = process.env.EXCHANGE_API_KEY;
module.exports = {
  PORT,
  BASE_URL,
  MONGO_URI,
  // EXCHANGE_API_KEY
};
