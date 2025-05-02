import React, { useEffect, useState } from 'react'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../Utils/helper'
import { LuPlus } from 'react-icons/lu'

export default function IncomeOverview({transactions, onAddIncome}) {
    const [chartData, setChartData] = useState([])
    
    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);

        return () =>{};   
    }, [transactions])
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
        <div className=''>
            <h5 className='text-xl'>Income Overview</h5>
            <p className='text-xs text-gray-400 mt-0.5'>
                Track your earinings over time and analyze your income trends
            </p>
        </div>

        <button className='add-btn' onClick={onAddIncome}>
            <LuPlus className='text-lg'/>
            Add Income    
        </button>
        </div>

        <div className='mt-10'>
            <CustomBarChart data={chartData}/>
        </div>
    </div>


  )
}
