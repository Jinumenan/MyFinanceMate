// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGO_URI = 'mongodb+srv://Harishram:harish123@demo2.e7bi6.mongodb.net/harish?retryWrites=true&w=majority';
    
    if (!MONGO_URI) {
      throw new Error('MongoDB URI is not defined');
    }
    
    const conn = await mongoose.connect(MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
