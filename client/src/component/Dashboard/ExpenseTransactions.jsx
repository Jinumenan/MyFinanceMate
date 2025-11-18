import React from 'react'
import { LuArrowBigRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

export default function ExpenseTransactions({transactions, onSeeMore}) {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'> Expenses</h5>

            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowBigRight className='text-base'/>
            </button>
        </div>

        <div className='mt-6'>
          {transactions?.slice(0,5)?.map((expense) =>(
            <TransactionInfoCard
                key = {expense._id}
                title = {expense.category}
                icon = {expense.icon}
                date = {moment(expense.date).format("MMM DD, YYYY")}
                amount = {expense.amount}
                type = "expense"
                hideDeleteBtn 
            />
          ))}
        </div>

  
        </div>
  )
}
