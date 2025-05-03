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

    const [openAddIncomeModel, setOpenAddincomeModel] = useState(false);
    const [currentIncome, setCurrentIncome] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // get all income
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
        } finally {
            setLoading(false);
        }
    }

    // Add/Update income
    const handleAddIncome = async (income) => {
        const {source, amount, date, icon} = income;
        console.log("handleAddIncome called with:", income);
        console.log("Current editing state:", { isEditing, currentIncomeId: currentIncome?._id });

        if (!source.trim()) {
            toast.error("Source is required.")
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0){
            toast.error("Amount should be a valid number greater than 0")
            return;
        }

        if (!date) {
            toast.error("Date is required");
            return
        }

        try {
            if (isEditing && currentIncome && currentIncome._id) {
                console.log(`Updating income with ID: ${currentIncome._id}`);
                
                // Make sure this path is using API_PATHS and not hardcoded
                const updateUrl = API_PATHS.INCOME.UPDATE_INCOME(currentIncome._id);
                console.log("Update URL being used:", updateUrl);
                
                const response = await axiosInstance.put(updateUrl, {
                    source,
                    amount,
                    date,
                    icon,
                });
                
                console.log("Update response:", response);
                toast.success("Income updated successfully");
            } else {
                await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                    source,
                    amount,
                    date,
                    icon,
                });
                toast.success("Income added successfully");
            }
            
            setOpenAddincomeModel(false);
            setIsEditing(false);
            setCurrentIncome(null);
            fetchIncomedetails();
        } catch (error) {
            console.error("Error in handleAddIncome:", error);
            console.error("Full request URL:", error.config?.url);
            toast.error(
                isEditing 
                    ? "Error updating income" 
                    : "Error adding income"
            );
        }
    }

    // Handle edit income
    const handleEditIncome = async (id) => {
        try {
            console.log("Edit clicked for ID:", id);
            // Find the income to edit
            const incomeToEdit = incomeData.find(income => income._id === id);
            
            if (incomeToEdit) {
                console.log("Found income to edit:", incomeToEdit);
                // Set editing state variables
                setCurrentIncome(incomeToEdit);
                setIsEditing(true);
                setOpenAddincomeModel(true);
            } else {
                console.error("Income not found with ID:", id);
                toast.error("Income not found");
            }
        } catch (error) {
            console.error("Error in handleEditIncome:", error);
            toast.error("Failed to prepare income for editing");
        }
    }

    // Delete income
    const deleteIncome = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Income details deleted successfully");
            fetchIncomedetails();
        } catch (error) {
            console.error(
                "Error deleting income:",
                error.response?.data?.message || error.message
            );
        }
    }

    // Download income details
    const handleDownloadIncomDetails = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
                responseType: 'blob'
            });
            
            // Create a URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'income_details.csv'); // or .pdf, .xlsx depending on your API
            
            // Append to body, click and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            toast.success("Income details downloaded successfully");
        } catch (error) {
            console.error(
                "Error downloading income details:",
                error.response?.data?.message || error.message
            );
        }
    };

    // Reset form when closing modal
    const handleCloseModal = () => {
        setOpenAddincomeModel(false);
        setIsEditing(false);
        setCurrentIncome(null);
    }

    useEffect(() => {
        fetchIncomedetails();
        return () => {};
    }, []);

    return (
        <div className='w-auto h-auto font-serif'>
            <div className='mt-4'><Navbar/></div>
            <div activeMenu="Income">
                <div className='my-5 mx-auto'>
                    <div className='grid drid-cols-1 gap-6'>
                        <div className=''>
                            <IncomeOverview
                                transactions={incomeData}
                                onAddIncome={() => {
                                    setIsEditing(false);
                                    setCurrentIncome(null);
                                    setOpenAddincomeModel(true);
                                }}
                            />
                        </div>
                        <IncomeList
                            transactions={incomeData}
                            onDelete={(id) => {
                                setOpenDeleteAlert({show: true, data: id});
                            }}
                            onDownload={handleDownloadIncomDetails}
                            onEdit={handleEditIncome}
                        />
                    </div>
                    
                    <Modal
                        isOpen={openAddIncomeModel}
                        onClose={handleCloseModal}
                        title={isEditing ? "Edit Income" : "Add Income"}
                    >
                        <AddIncomeform 
                            onAddIncome={handleAddIncome}
                            initialData={currentIncome}
                            isEditing={isEditing}
                        />
                    </Modal>
                    <Modal
                        isOpen={opeanDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({show: false, data: null})}
                        title="Delete Income"
                        >
                        <DeleteAlert
                            content="Are you sure you want to delete this income"
                            onDelete={() => deleteIncome(opeanDeleteAlert.data)}
                        />
                    </Modal>
                </div>
            </div>
        </div>
    );
}
