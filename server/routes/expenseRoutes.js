const express = require("express");

const{
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel,
    updateExpense, // Add this
} = require("../controllers/expenseController");

const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);
router.put("/:id", protect, updateExpense); // Add this route

module.exports = router;