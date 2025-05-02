const Transaction = require('../models/Transaction');

// Get all transactions with pagination and filters
exports.getTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    
    // Get sort parameters
    const sortField = req.query.sortField || 'date';
    const sortOrder = req.query.sortOrder || 'desc';
    
    // Create sort object with collation for title sorting
    const sortOptions = {};
    sortOptions[sortField] = sortOrder === 'desc' ? -1 : 1;

    const filter = {};

    // Apply filters with proper type checking
    if (req.query.category && req.query.category !== 'All Categories') {
      filter.category = req.query.category;
    }

    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { note: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    // Enhanced type filtering
    if (req.query.type) {
      switch (req.query.type) {
        case 'income':
          filter.amount = { $gt: 0 };
          break;
        case 'expense':
          filter.amount = { $lt: 0 };
          break;
      }
    }

    // Amount range filter with proper type conversion
    if (req.query.minAmount || req.query.maxAmount) {
      filter.amount = {};
      if (req.query.minAmount) {
        filter.amount.$gte = parseFloat(req.query.minAmount);
      }
      if (req.query.maxAmount) {
        filter.amount.$lte = parseFloat(req.query.maxAmount);
      }
    }

    // Add starred filter
    if (req.query.starred === 'true') {
      filter.starred = true;
    }

    // Date range filter
    if (req.query.startDate && req.query.endDate) {
      filter.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    const totalTransactions = await Transaction.countDocuments(filter);
    
    // Add collation for case-insensitive sorting when sorting by title
    const query = Transaction.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();

    if (sortField === 'title') {
      query.collation({ locale: 'en', strength: 2 });
    }

    const transactions = await query;

    return res.json({
      success: true,
      data: {
        transactions,
        currentPage: page,
        totalPages: Math.ceil(totalTransactions / limit),
        totalItems: totalTransactions,
      },
    });
  } catch (error) {
    console.error('Error in getTransactions:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error fetching transactions',
    });
  }
};

// Filter transactions with advanced options
exports.filterTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const filter = {};

    // Category filter
    if (req.query.categories && req.query.categories !== '') {
      const categories = req.query.categories.split(',');
      if (categories.length > 0 && categories[0] !== 'All Categories') {
        filter.category = { $in: categories };
      }
    }

    // Amount range filter
    if (req.query.minAmount || req.query.maxAmount) {
      filter.amount = {};
      if (req.query.minAmount) filter.amount.$gte = parseFloat(req.query.minAmount);
      if (req.query.maxAmount) filter.amount.$lte = parseFloat(req.query.maxAmount);
    }

    // Transaction type filter (income/expense)
    if (req.query.type === 'income') {
      filter.amount = { $gt: 0 };
    } else if (req.query.type === 'expense') {
      filter.amount = { $lt: 0 };
    }

    // Starred filter
    if (req.query.starred === 'true') {
      filter.starred = true;
    }

    // Date range filter
    if (req.query.startDate && req.query.endDate) {
      filter.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    const totalTransactions = await Transaction.countDocuments(filter);
    const transactions = await Transaction.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return res.json({
      success: true,
      data: {
        transactions,
        currentPage: page,
        totalPages: Math.ceil(totalTransactions / limit),
        totalItems: totalTransactions,
      },
    });
  } catch (error) {
    console.error('Error in filterTransactions:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error filtering transactions',
    });
  }
};

// Get single transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error('Error in getTransactionById:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error fetching transaction',
    });
  }
};

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { title, amount, category, date, time, note } = req.body;

    // Validation
    if (!title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (parseFloat(amount) <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }
    if (new Date(date) > new Date()) {
      return res.status(400).json({ error: 'Date cannot be in the future' });
    }

    const transaction = new Transaction({
      title,
      amount,
      category,
      date: date || Date.now(),
      time: time || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      note: note || '',
      starred: false,
      split: false,
      splitTransactions: [],
    });

    const createdTransaction = await transaction.save();
    res.status(201).json(createdTransaction);
  } catch (error) {
    console.error('Error in createTransaction:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error creating transaction',
    });
  }
};

// Update an existing transaction
exports.updateTransaction = async (req, res) => {
  try {
    const updates = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    res.json({ success: true, data: transaction });
  } catch (error) {
    console.error('Error in updateTransaction:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error updating transaction',
    });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction removed successfully' });
  } catch (error) {
    console.error('Error in deleteTransaction:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error deleting transaction',
    });
  }
};

// Toggle star status for a transaction
exports.toggleStar = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.starred = !transaction.starred;
    const updatedTransaction = await transaction.save();

    res.json(updatedTransaction);
  } catch (error) {
    console.error('Error in toggleStar:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error toggling star status',
    });
  }
};

// Add a note to a transaction
exports.addNote = async (req, res) => {
  try {
    const { note } = req.body;

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.note = note;
    const updatedTransaction = await transaction.save();

    res.json(updatedTransaction);
  } catch (error) {
    console.error('Error in addNote:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error adding note to transaction',
    });
  }
};

// Split a transaction into multiple sub-transactions
exports.splitTransaction = async (req, res) => {
  try {
    const { splitTransactions } = req.body;

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.split = true;
    transaction.splitTransactions = splitTransactions;

    const updatedTransaction = await transaction.save();

    res.json(updatedTransaction);
  } catch (error) {
    console.error('Error in splitTransaction:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error splitting transaction',
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    // Find unique categories from transactions with counts
    const result = await Transaction.aggregate([
      { $match: { category: { $nin: ['Income', 'Expense'] } } }, // Exclude default categories
      { $group: { _id: "$category", count: { $sum: 1 } } }, // Count occurrences
      { $sort: { count: -1 } }, // Sort by frequency (descending)
      { $limit: 5 } // Take only top 5 most used categories
    ]);
    
    const categories = result.map(item => item._id);
    
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Error in getCategories:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error fetching categories'
    });
  }
};