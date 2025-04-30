const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false }, 
    
    // role: { type: String, enum: ["user", "admin"], default: "user" },
    // defaultCurrency: {
    //   type: String,
    //   enum: ["USD", "EUR", "LKR", "GBP", "AUD", "JPY"], 
    //   default: "LKR",
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);