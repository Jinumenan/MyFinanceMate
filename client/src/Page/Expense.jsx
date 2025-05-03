import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../hooks/useUserAuth';
import { API_PATHS } from '../Utils/apiPath';
import toast from 'react-hot-toast';
import axiosInstance from '../Utils/axiosinstance';
import ExpenseOverview from '../component/Expense/ExpenseOverview';
import AddExpenseForm from '../component/Expense/AddExpenseForm';
import Modal from '../component/Model';
import ExpeseList from '../component/Expense/ExpeseList';
import DeleteAlert from '../component/DeleteAlert';
import Navbar from '../Footers/Navbar';
import ExpenseLimitProgressBar from '../component/Expense/ExpenseLimitProgressBar';

export default function Expense() {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opeanDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
  
  // Add expense limit state
  const [expenseLimit, setExpenseLimit] = useState(5000); // $5000 default limit
  const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
  const [showLimitAlert, setShowLimitAlert] = useState(false);
  
  // Fetch expenses on component mount
  useEffect(() => {
    fetchExpensedetails();
    return () => {};
  }, []);
  
  // Calculate total expenses for the current month
  useEffect(() => {
    const calculateMonthlyTotal = () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      const monthlyExpenses = expenseData.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && 
               expenseDate.getFullYear() === currentYear;
      });
      
      const total = monthlyExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
      setCurrentMonthTotal(total);
      
      // Check if limit is exceeded
      if (total > expenseLimit && !showLimitAlert) {
        setShowLimitAlert(true);
      }
    };
    
    calculateMonthlyTotal();
  }, [expenseData, expenseLimit]);
  
  // Get all expenses
  const fetchExpensedetails = async() => { 
    setLoading(true);
    
    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
      
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong, please try again", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Add expense
  const handleAddExpense = async (expense) => {
    const {category, amount, date, icon} = expense;
    
    if (!category.trim()) {
      toast.error("Category is required.");
      return;
    }
    
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }
    
    if (!date) {
      toast.error("Date is required");
      return;
    }
    
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      
      setOpenAddExpenseModel(false);
      //toast.success("Expense added successfully");
      
      // Check if this expense will exceed the monthly limit
      const newTotal = currentMonthTotal + Number(amount);
      if (newTotal > expenseLimit && !showLimitAlert) {
        setShowLimitAlert(true);
      }
      
      fetchExpensedetails();
    } catch (error) {
      console.error(
        "Error adding expense:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to add expense. Please try again.");
    }
  };
  
  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({show: false, data: null});
      
      // Show success toast when expense is deleted - using react-toastify
      toast.success("Expense deleted successfully!");
      
      // Reload expense details
      fetchExpensedetails();
    } catch (error) {
      console.error(
        "Error deleting Expense:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to delete expense. Please try again.");
    }
  };
  
  // Download expense details
  const handleDownloadExpenseDetails = async () => {
    // Show loading toast
    const loadingToastId = toast.loading("Generating expense report...");
    
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob"
      });
      
      // Create URL for blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Dismiss loading toast and show success toast
      toast.dismiss(loadingToastId);
      toast.success("Expense report downloaded successfully!");
    } catch (error) {
      // Dismiss loading toast and show error toast
      toast.dismiss(loadingToastId);
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense report. Please try again.");
    }
  };

  return (
    <div className='w-auto h-auto font-serif'>
      <div className='mt-4'><Navbar/></div>
      <div className='my-5 mx-auto'> 
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModel(true)}
            />
          </div>
        </div>

        {/* Add the expense limit progress bar below the graph */}
        <div className="mt-6 mb-6">
          <ExpenseLimitProgressBar 
            currentAmount={currentMonthTotal}
            limitAmount={expenseLimit}
          />
        </div>

        <ExpeseList
          transcations={expenseData}
          onDelete={(id) => {
            setOpenDeleteAlert({show: true, data: id});
          }}
          onDownload={handleDownloadExpenseDetails}
        />

        <Modal 
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm 
            onAddExpense={handleAddExpense}
          />
        </Modal>

        <Modal
          isOpen={opeanDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this Expense"
            onDelete={() => deleteExpense(opeanDeleteAlert.data)}
          />
        </Modal>

        {/* Monthly limit exceeded alert */}
        <Modal
          isOpen={showLimitAlert}
          onClose={() => setShowLimitAlert(false)}
          title="Monthly Expense Limit Exceeded!"
        >
          <div className="p-4 text-center">
            <div className="text-red-500 mb-4 text-5xl">⚠️</div>
            <h3 className="text-xl font-medium mb-2">Warning!</h3>
            <p className="mb-6">You have exceeded your monthly expense limit of ${expenseLimit}.</p>
            <p className="mb-6">Current monthly expenses: <span className="font-bold text-red-500">${currentMonthTotal.toFixed(2)}</span></p>
            <p className="mb-2">Please consider reducing your expenses for the rest of the month.</p>
            <div className="mt-6">
              <button 
                onClick={() => setShowLimitAlert(false)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}