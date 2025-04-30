require('dotenv').config(); // Ensure this is at the top
const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require("./db");
const { PORT, BASE_URL } = require("./env");

const userRoutes = require("./routes/UserRouter");

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);

// Catch undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Database Connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${BASE_URL}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to database connection error:', err);
  });

module.exports = app;