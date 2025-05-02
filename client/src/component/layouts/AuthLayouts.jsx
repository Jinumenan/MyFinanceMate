import React from 'react'
import { Link } from 'react-router-dom'

export default function AuthLayouts({children}) {
  return (
    <div className='flex'>
        <div className="w-screen h-screen flex md:w-[60vw] px-12 pt-8 pb-12">
            <Link to="/" className="text-lg font-medium text-black whitespace-nowrap w-fit"> MYFinanceMate</Link>
            {children}
            
        </div>

    </div>
  )
}
