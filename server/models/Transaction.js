const mongoose = require('mongoose');

// Schema for split transactions
const splitTransactionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

// Main transaction schema
const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    time: {
      type: String,
      default: () => {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      },
    },
    note: {
      type: String,
      default: '',
    },
    starred: {
      type: Boolean,
      default: false,
    },
    split: {
      type: Boolean,
      default: false,
    },
    splitTransactions: [splitTransactionSchema],
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
