const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// Connect to database
connectDB();

// CORS configuration - Allow all origins for development
app.use(cors());

// Middleware
app.use(express.json());

// Routes - Use the routes defined in `transactionRoutes.js`
app.use('/api/transactions', transactionRoutes);

// Default route
app.get('/', (req, res) => res.json({ message: 'API is running...' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
