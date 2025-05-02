const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Place specific routes before parameter routes
router.get('/categories', transactionController.getCategories);

// GET filtered transactions
router.get('/filter', transactionController.filterTransactions);

// Then place other routes
router.get('/', transactionController.getTransactions);
router.post('/', transactionController.createTransaction);

// Parameter routes should come last
router.get('/:id', transactionController.getTransactionById);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);
router.patch('/:id/star', transactionController.toggleStar);
router.patch('/:id/note', transactionController.addNote);
router.patch('/:id/split', transactionController.splitTransaction);

module.exports = router;
