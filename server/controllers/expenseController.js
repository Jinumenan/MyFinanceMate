const xlsx = require('xlsx');
const Expense = require('../models/Expense');

//add Expense source

exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const { icon, category, amount, date } = req.body;

        // Check if the user exists
        if (!category || !amount || !date) {
            return res.status(404).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);

    }catch (error){
        res.status(500).json({ message:"server error" });
    }
}


//get all Expense source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
}

//delete all Expense source
exports.deleteExpense = async (req, res) => {

    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense source deleted successfully" });
    }catch (error) {
        res.status(500).json({ message: "server error" });
    }
}

//download Expense source in excel format

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        //prepare data for excel
        const data = expense.map((item) => ({
            category: item.category ,
            Amount: item.amount,
            date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "Expense_details.xlsx");
        res.download('Expense_details.xlsx');
    }catch(error){
        res.status(500).json({ message: "server error" });
    }
}

//update Expense source

exports.updateExpense = async (req, res) => {
    try {
        const { category, amount, date, icon } = req.body;
        const userId = req.user.id;
        const expenseId = req.params.id;

        // Validate input
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Find expense and ensure it belongs to the user
        const expense = await Expense.findOne({ _id: expenseId, userId });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        // Update expense
        expense.category = category;
        expense.amount = amount;
        expense.date = date;
        expense.icon = icon;

        await expense.save();

        res.status(200).json({ message: "Expense updated successfully", expense });
    } catch (error) {
        console.error("Error updating expense:", error);
        res.status(500).json({ message: "Server error" });
    }
};