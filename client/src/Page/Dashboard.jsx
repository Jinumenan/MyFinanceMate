import React, { useContext, useEffect, useState } from 'react'
import Footer from '../Footers/Footer'
import Navbar from '../Footers/Navbar'
import { user } from 'react'
import { useUserAuth } from '../hooks/useUserAuth';
import axiosInstance from '../Utils/axiosinstance'
import { API_PATHS } from '../Utils/apiPath';
import {  addThousandsSeparator } from '../Utils/helper';
import { UserContext } from '../context/UserContext'
import CharAvatar from '../component/Cards/CharAvatar'
import { useNavigate } from 'react-router-dom';
import InfoCard from '../component/Cards/InfoCard';
import { IoMdCard } from 'react-icons/io'
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import FinanceDverview from '../component/Dashboard/FinanceDverview';
import Last30DaysExpenses from '../component/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '../component/Dashboard/RecentIncomeWithChart';
import RecentTransactions from '../component/Dashboard/RecentTransactions';
import NotificationBell from '../component/voice-input/NotificationBell';

export default function Dashboard() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext);

    
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () =>{
        // if (loading) return;
        setLoading(true);
    
        try {
          const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
    
          if (response.data) {
            setDashboardData(response.data);
          }
        } catch (error) {
          console.log("something went wrong, please try again", error);
        } finally {
          setLoading(false);
        } 
      };

      useEffect(() =>{
        fetchDashboardData();
        return () => {}
      }, [])

  return (
    <>
        {/* Body */}
        <div className='w-auto h-auto font-serif'>

            {/* Navbar */}
            <div className='mt-4'><Navbar/></div>

            {/* user Profile */}
            <div className='bg-gradient-to-r from-white  to-yellow-300  w-auto ml-4 shadow-lg mr-4 h-auto pb-8 mt-4 rounded-lg'>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row w-auto h-auto pl-20 pt-6 '>
                        {/* profile pic */}
                        <div>
                        
                        {user?.profileImageUrl?(
                            <img
                                src = {user?.profileImageUrl || ""}
                                alt = "Profile Image"
                                className='w-20 h-20 mt-4 bg-slate-400 shadow-lg rounded-full'
                                />): <CharAvatar
                                fullName = {user?.fullName }
                                width = "w-20"
                                height = "h-20"
                                style = "text-xl"
                                />}
                        </div>

                        <div className='flex flex-row'>
                            <div className='flex flex-col justify-center mt-4 pl-4'>
                                <span className='text-black ml-2 text-lg'>Name: {user?.fullName || ""}</span>
                                <span className='text-black ml-2 text-lg'>Total Balance: {addThousandsSeparator(dashboardData?.totalBalance || 0)}</span>
                                <span className='text-black ml-2 mt-1 text-sm'>Welcome To Your Dashboard!</span>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <button className='bg-yellow-600/50 w-[100px] h-[40px] rounded-md mr-40 mt-[60px]'>Edit Profile</button>
                        
                    </div>
                </div>
            </div>

            {/* financial over view and graph */}
            <div className='flex m-2  w-auto'>
                <div className=' w-[500px] h-auto flex-1 ml-10 pb-6'> 
                    <div className='flex flex-col p-4 m-4'>
                        <h2 className='text-3xl p-3 underline underline-offset-8'>Finacial Overview</h2>
                        <span className='text-sm p-4'>Summary Of Income and Expenses</span>
                        <button className='bg-yellow-300 w-[125px] h-[40px] ml-4 border-2 border-black rounded-md mr-20' onClick = {() => navigate("/viewtransaction")}>View Details</button>
                    </div>
                    <div className='flex justify-center gap-10'>
                        <div className='flex flex-col'>
                            <InfoCard
                                icon={<IoMdCard />}
                                label="Total Balance"
                                value = {addThousandsSeparator(dashboardData?.totalBalance || 0)}
                                color = "bg-yellow-500"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <InfoCard
                                icon={<LuWalletMinimal/>}
                                label="Total Income"
                                value = {addThousandsSeparator(dashboardData?.totalIncome || 0)}
                                color = "bg-green-500"
                            />                         
                        </div>
                    </div>
                    <div className='flex flex-col h-[70px] px-28 justify-center mt-10'>
                        <InfoCard
                            icon={<LuHandCoins/>}
                            label="Total Expense"
                            value = {addThousandsSeparator(dashboardData?.totalExpense || 0)}
                            color = "bg-red-500"
                        />  
                    </div>
                </div>
                {/* graph side */}
                <div className=' w-[500px] h-auto flex-1 mr-10 mt-10'>
                        <div className=''>
                        <FinanceDverview
                            totalBalance = {dashboardData?.totalBalance || 0}
                            totalIncome = {dashboardData?.totalIncome || 0}
                            totalExpense = {dashboardData?.totalExpense || 0}
                        />
                        </div>
                </div>
            </div>

            {/* overview charts */}
            {/* <div className=' w-auto h-auto p-2 ' >
                < h1 className='p-6 text-black text-center m-4 underline underline-offset-8 text-3xl'>Overview Charts</h1>
                <div className='flex w-auto justify-between mb-4'>
                    <div className='flex-1 w-auto h-auto ml-10 m-4'>
                        <Last30DaysExpenses data = {dashboardData?.last30DaysExpense?.transactions || []}/>
                    </div>
                    <div className='flex-1 w-auto h-auto m-4'>
                    <RecentIncomeWithChart data = {dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
                        totalIncome = {dashboardData?.totalIncome || 0}/>
                    </div>
                </div>
            </div> */}

            {/* recent activities */}
            <div className='p-2 flex w-auto h-auto mt-10'>
                <div className='flex-1 bg-lime-50 w-auto h-auto ml-8 shadow-lg'>
                <div className='flex flex-col justify-center items-center p-10 m-10'>
                        <h2 className='text-4xl p-3 ml-12'>Recent Activities</h2>
                        <span className='text-sm p-3 pl-2'>Stay updated on your transactions</span>
                        <button className='bg-yellow-300 w-auto h-auto m-4 rounded-md p-3 pl-20 pr-20'>View All</button>
                    </div>
                    <div className='bg-white w-auto h-[50px]'></div>
                </div>
                <div className='flex-1 w-auto h-auto mr-8'>
                    <div className=''>
                        <div className='w-auto h-auto'>
                            {/* recently add income and expense list */}
                            <RecentTransactions
                                transactions = {dashboardData?.recentTransactions}
                                onSeeMore = {() => navigate("/expense")}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* footer */}
            <div className=''>
                <Footer/>
            </div>


        </div>
    </>
  )
}
