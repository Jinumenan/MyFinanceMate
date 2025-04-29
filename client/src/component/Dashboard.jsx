import React from 'react'
import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'

export default function Dashboard() {
  return (
    <>
        {/* Body */}
        <div className='w-auto h-auto font-serif'>

            {/* Navbar */}
            <div><Navbar/></div>

            {/* user Profile */}
            <div className='bg-slate-200 w-auto h-auto pb-4'>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row w-auto h-auto pl-20 pt-4'>
                        {/* profile pic */}
                        <div className='bg-black w-[80px] h-[80px] rounded-full m-4 pt-1'>
                        </div>

                        <div className='flex flex-row'>
                            <div className='flex flex-col justify-center mt-4 pl-4'>
                                <span className='text-black p-1 text-sm'>Name: 
                                    <input type="text" />
                                </span>
                                <span className='text-black p-1 text-sm'>Total Balance: 
                                    <input type="text" />
                                </span>
                                <span className='text-black p-1 text-sm'>Welcome To Your Dashboard!</span>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <button className='bg-orange-100 w-[100px] h-[40px] rounded-md mr-40 mt-[60px]'>Edit Profile</button>
                    </div>
                </div>
            </div>

            {/* financial over view and graph */}
            <div className='flex m-2  w-auto'>
                <div className='bg-slate-500 w-[500px] h-auto flex-1 ml-10 pb-6'> 
                    <div className='flex flex-col p-4 m-4'>
                        <h2 className='text-3xl p-3'>Finacial Overview</h2>
                        <span className='text-sm p-4'>Summary Of Income and Expenses</span>
                        <button className='bg-orange-100 w-[125px] h-[40px] ml-4 rounded-md mr-20'>View Details</button>
                    </div>
                    <div className='flex justify-center '>
                        <div className='flex flex-col border-solid border-2 border-sky-500 m-3 h-[70px]'>
                            <label>TotalIncome</label>
                            <input className='w-[200px] m-2' type="text" />
                        </div>
                        <div className='flex flex-col border-solid border-2 border-sky-500 m-3'>
                            <label>TotalExpense</label>
                            <input className='w-[200px] m-2' type="text" />
                        </div>
                    </div>
                    <div className='flex flex-col border-solid border-2 border-sky-500 w-auto h-[70px] ml-24 mr-24'>
                        <label>Recent Additions</label>
                        <input className='w-[200px] m-2' type="text" />
                    </div>
                </div>

                {/* graph side */}
                <div className='bg-red-300 w-[500px] h-auto flex-1 mr-10'>
                        <h2 className=' pl-6 mt-10'>Graph</h2>
                        <div className='flex m-2 bg-violet-100 w-auto h-[300px]'></div>
                </div>
            </div>

            {/* overview charts */}
            <div className=' w-auto h-auto p-2 ' >
                {/* heading */}
                < h1 className='p-6 text-black text-center m-4 text-2xl'>Overview Charts</h1>
                <div className='flex w-auto justify-between mb-4'>
                    {/* chart A */}
                    <div className='flex-1 bg-stone-600 w-auto h-auto ml-10 m-4'>
                        <h2 className=' pl-6 mt-10'>Expense Breakdown</h2>
                        <div className='flex m-2 bg-violet-100 w-auto h-[300px]'></div>
                    </div>

                    {/* chart B */}
                    <div className='flex-1 bg-orange-400 w-auto h-auto m-4'>
                        <h2 className=' pl-6 mt-10'>Income Trend</h2>
                        <div className='flex m-2 bg-violet-100 w-auto h-[300px]'></div>
                    </div>

                    {/* chart C */}
                    <div className='flex-1 bg-amber-400 w-auto h-auto mr-10 m-4'>
                        <h2 className=' pl-6 mt-10'>Expense Trend</h2>
                        <div className='flex m-2 bg-violet-100 w-auto h-[300px]'></div>
                    </div>                    

                </div>
            </div>

            {/* recent activities */}
            <div className='p-4 flex w-auto h-auto'>
                <div className='flex-1 bg-lime-50 w-auto h-auto ml-8'>
                <div className='flex flex-col justify-center items-center p-10 m-10'>
                        <h2 className='text-4xl p-3 ml-12'>Recent Activities</h2>
                        <span className='text-sm p-3 pl-2'>Stay updated on your transactions</span>
                        <button className='bg-orange-100 w-auto h-auto m-4 rounded-md p-3 pl-20 pr-20'>View All</button>
                    </div>
                </div>
                <div className='flex-1 bg-lime-500 w-auto h-auto mr-8'>
                    <div className='mt-10'>
                        <div className='flex flex-row w-auto h-auto pl-20 pt-4'>
                            {/* profile pic */}
                            <div className='bg-black w-[60px] h-[60px] rounded-lg m-4'>
                            </div>

                            <div className='flex flex-row'>
                                <div className='flex flex-col justify-center mt-1 pl-2'>
                                        <input className='m-1' type="text" />
                                        <input className='m-1' type="text" />
                                </div>
                                <div className='flex flex-col justify-center mt-1 pl-10'>
                                        <input className='m-4' type="text" />
                                </div>
                            </div>
                            
                        </div>
                        <div className='flex flex-row w-auto h-auto pl-20 pt-4'>
                            {/* profile pic */}
                            <div className='bg-black w-[60px] h-[60px] rounded-lg m-4'>
                            </div>

                            <div className='flex flex-row'>
                                <div className='flex flex-col justify-center mt-1 pl-2'>
                                        <input className='m-1' type="text" />
                                        <input className='m-1' type="text" />
                                </div>
                                <div className='flex flex-col justify-center mt-1 pl-10'>
                                        <input className='m-4' type="text" />
                                </div>
                            </div>
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
