import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

export default function IncomeList({transactions, onDelete, onDownload, onEdit}) {
  return (
    <div className='card'>
        <div className="flex items-center justify-between">
            <h5 className='text-lg'>Income Sources</h5>

            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base'/>Download
            </button>
        </div>

        <div className='grid m-2 grid-rows-1 md:grid-cols-2'>
            {transactions?.map((income) =>(
                <TransactionInfoCard
                    key={income._id}
                    title={income.source}
                    icon={income.icon}
                    date={moment(income.date).format("Do MMM YYYY")}
                    amount={income.amount}
                    type="income"
                    onDelete={() => onDelete(income._id)}
                    onEdit={() => onEdit(income._id)}
                />
            ))}
        </div>
    </div>
  )
}
