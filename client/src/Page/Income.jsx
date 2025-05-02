import React, { useEffect, useState } from 'react'
import IncomeOverview from '../component/Income/IncomeOverview'
import axiosInstance from '../Utils/axiosinstance';
import { API_PATHS } from '../Utils/apiPath';
import Modal from '../component/Model';
import AddIncomeform from '../component/Income/AddIncomeform';
import toast from 'react-hot-toast';
import IncomeList from '../component/Income/IncomeList';
import DeleteAlert from '../component/DeleteAlert';
import { useUserAuth } from '../hooks/useUserAuth';
import Navbar from '../Footers/Navbar';

export default function Income() {
    useUserAuth();

    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [opeanDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    const [openAddIncomeModel, setOpenAddincomeModel] = useState(false)

    // get all inome
    const fetchIncomedetails = async() =>{ 
    // if (loading) return;
    setLoading(true);

    try {
        setLoading(true)
        const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_INCOME}`);

        if (response.data) {
            setIncomeData(response.data);
        }
    } catch (error) {
        console.log("something went wrong, please try again", error);
    }finally{
        setLoading(false);
    }
    }

    //add income
    const handleAddIncome = async (income) =>{
        const {source, amount, date, icon} = income;

        if (!source.trim()) {
            toast.error("source is required.")
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
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
                source,
                amount,
                date,
                icon,
            });

            setOpenAddincomeModel(false);
            toast.success("income added successfully");
            fetchIncomedetails();
        } catch (error) {
            "error adding income",
            error.response?.data?.message || error.message
        }
    }

    //delete income
    const deleteIncome = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Income delails deleted successfully");
            fetchIncomedetails();
        } catch (error) {
            console.error(
                "Error deleting income:",
                error.response?.data?.message || error.message
            )
        }
    }

    // download income details
    const handleDownloadIncomDetails = async () =>{};

    useEffect(() => {
        fetchIncomedetails();

        return () => {};
    }, []);

  return (
    <div className='w-auto h-auto font-serif'>
        <div className='mt-4'><Navbar/></div>
        <div activeMenu = "Income">
            <div className='my-5 mx-auto'>
                <div className='grid drid-cols-1 gap-6'>
                    <div className=''>
                        <IncomeOverview
                            transactions = {incomeData}
                            onAddIncome = {() => setOpenAddincomeModel(true)}
                        />
                        </div>
                        <IncomeList
                            transactions = {incomeData}
                            onDelete = {(id) => {
                                setOpenDeleteAlert({show: true, data: id});
                            }}
                            onDownload = {handleDownloadIncomDetails}
                        />
                    </div>
                    
                    <Modal
                        isOpen = {openAddIncomeModel}
                        onClose = {() => setOpenAddincomeModel(false)}
                        title = "Add Income"
                    >
                        {/* <div>Add Income Form</div> */}
                        <AddIncomeform onAddIncome = {handleAddIncome}/>
                    </Modal>
                    <Modal
                        isOpen={opeanDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({show: false, data: null})}
                        title="Delete Income"
                        >
                        <DeleteAlert
                            content = "Are you sure you want to delete this in come"
                            onDelete = {() => deleteIncome(opeanDeleteAlert.data)}
                        />
                    </Modal>
            </div>
        </div>
    </div>

  )
}
