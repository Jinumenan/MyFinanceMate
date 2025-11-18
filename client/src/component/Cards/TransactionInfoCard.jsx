import React from 'react'
import {
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2,
} from "react-icons/lu";


export default function TransactionInfoCard({
    title,
    icon,
    date,
    amount,
    type,
    hideDelteBtn,
    onDelete
}) {
    const getAmountStyles = () =>{
        return type === "income"? "bg-green-50 text-green-500": "bg-red-50 text-red-500"
    }

return (
    <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60'>
        {/* Icon Section */}
        <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
            {icon ? (
                <img src={icon} alt={title} className='w-6 h-6'/>
            ) : (
                <LuUtensils />
            )}
        </div>

        {/* Title and Date Section */}
        <div className='flex-1'>
            <p className='text-sm text-gray-700 font-medium'>{title}</p>
            <p className='text-xs text-gray-400 mt-1'>{date}</p>
        </div>

        {/* Delete Button */}
        {!hideDelteBtn && (
            <button 
                className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                onClick={onDelete}
            >
                <LuTrash2 size={18} />
            </button>
        )}
        
        {/* Amount Section */}
        <div 
            className={`flex items-center gap-1 px-3 py-1 rounded-full ${getAmountStyles()}`}
        >
            <h6 className='text-sm font-medium'>
                {type === "income" ? "+" : "-"} ${amount}
            </h6>
            {type === "income" ? <LuTrendingUp size={14} /> : <LuTrendingDown size={14} />}
        </div>

    </div>
);
    
  
}
