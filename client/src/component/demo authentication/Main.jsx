import React from 'react'

export default function Main() {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
        
    }
  return (
    <>
        <div className='h-screen w-screen flex flex-row justify-center items-center font-serif'>
            <h1 className='text-3xl text-center'>Main Page</h1>
            <button onClick={handleLogout} className='border-solid border-2 border-white p-2 pr-6 pl-6 rounded-full '>LogOut</button>    
        </div>
    </>
  )
}
