import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../hooks/useUserAuth'
import { API_PATHS } from '../Utils/apiPath';
import toast from 'react-hot-toast';
import axiosInstance from '../Utils/axiosinstance';
import ExpenseOverview from '../component/Expense/ExpenseOverview';
// import DashboardLayout from '../component/layouts/DashboardLayout';
import AddExpenseForm from '../component/Expense/AddExpenseForm';
import Modal from '../component/Model';
import ExpeseList from '../component/Expense/ExpeseList';
import DeleteAlert from '../component/DeleteAlert';
import Navbar from '../Footers/Navbar';

export default function Expense() {
  
  useUserAuth();
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [opeanDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false)
    
    // get all Expense
    const fetchExpensedetails = async() =>{ 
      // if (loading) return;
      setLoading(true);
  
      try {
          setLoading(true)
          const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
  
          if (response.data) {
              setExpenseData(response.data);
          }
      } catch (error) {
          console.log("something went wrong, please try again", error);
      }finally{
          setLoading(false);
      }
      }
  
      //add Expense
      const handleAddExpense = async (expense) =>{
          const {category, amount, date, icon} = expense;
  
          if (!category.trim()) {
              toast.error("category is required.")
          }
  
          if (!amount || isNaN(amount) || Number(amount) <= 0){
              toast.error("amount should be a valid number greater than 0")
              return;
          }
  
          if (!date) {
              toast.error("Date is required");
              return
          }
  
          try {
              await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
                  category,
                  amount,
                  date,
                  icon,
              });
  
              setOpenAddExpenseModel(false);
              toast.success("expense added successfully");
              fetchExpensedetails();
          } catch (error) {
              "error adding expense",
              error.response?.data?.message || error.message
          }
      }


    //delete expense
    const deleteExpense = async (id) => {
      try {
          await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
          setOpenDeleteAlert({show: false, data: null});
          toast.success("Expense delails deleted successfully");
          fetchExpensedetails();
      } catch (error) {
          console.error(
              "Error deleting Expense:",
              error.response?.data?.message || error.message
          )
      }
  }


  // download expense details
  const handleDownloadExpenseDetails = async () =>{

    try{
    const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
      {
      responseType: "blob"
      }
  )
    
    //create url for blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Expense_details.xlsx");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    } catch (error){
      console.error("error downloading expense details:", error);
      toast.error("Failed to download expense details. please try agin")
    }
  }

      useEffect(() => {
        fetchExpensedetails();

        return () =>{}
      }, []);
    
  return (
    <div className='w-auto h-auto font-serif'>
        <div className='mt-4'><Navbar/></div>
          <div activeMenu = "Expense">
        <div className='my-5 mx-auto'> 
          <div className='grid grid-cols-1 gap-6'>
            <div className=''>
              <ExpenseOverview
                transactions = {expenseData}
                onExpenseIncome = {() => setOpenAddExpenseModel(true)}
              />
            </div>
          </div>

          <ExpeseList
            transcations = {expenseData}
            onDelete = {(id) => {
              setOpenDeleteAlert({show: true, data: id});
            }}
            onDownload = {handleDownloadExpenseDetails}
          />

          <Modal 
            isOpen = {openAddExpenseModel}
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
                  content = "Are you sure you want to delete this Expense"
                  onDelete = {() => deleteExpense(opeanDeleteAlert.data)}
              />
            </Modal>
        </div>
          </div>
    </div>
  )
}
