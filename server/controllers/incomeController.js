const xlsx = require('xlsx');
const Income = require('../models/Income');

//add income source

exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const { icon, source, amount, date } = req.body;

        // Check if the user exists
        if (!source || !amount || !date) {
            return res.status(404).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);

    }catch (error){
        res.status(500).json({ message:"server error" });
    }
}


//get all income source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
}

//delete all income source
exports.deleteIncome = async (req, res) => {

    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income source deleted successfully" });
    }catch (error) {
        res.status(500).json({ message: "server error" });
    }
}

//download income source in excel format

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        //prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download('income_details.xlsx');
    }catch(error){
        res.status(500).json({ message: "server error" });
    }


}