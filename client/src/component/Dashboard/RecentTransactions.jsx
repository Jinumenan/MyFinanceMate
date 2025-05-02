import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

export default function RecentTransactions({transactions, onSeeMore}) {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg underline underline-offset-8'>Recent Transactions</h5>
        </div>

        <div className='mt-6'>
            {transactions?.slice(0,5)?.map ((item) =>(
                <TransactionInfoCard
                    key={item._id}
                    title = {item.type == 'expense'? item.category: item.source}
                    icon = {item.icon}
                    date = {moment (item.date).format("MMM DD, YYYY")}
                    amount = {item.amount}
                    type = {item.type}
                    hideDeleteBtn
                />

            ))}
        </div>
    </div>
  )
}
