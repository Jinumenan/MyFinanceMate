import React, { useEffect, useState } from 'react'
import { prepareExpensenseBarChartData } from '../../Utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

export default function Last30DaysExpenses({data}) {
    const [chartData, setChartData] = useState([]);

    useEffect(() =>{
        console.log("Expense Chart Data input", data);
        const result = prepareExpensenseBarChartData(data);
        setChartData(result);

        return () => {};
    }, [data]);

  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 30 Days Expenses</h5>
        </div>

        <CustomBarChart data = {chartData}/>
    </div>
  )
}
