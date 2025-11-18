import React from 'react'

import home1 from '../assets/Home2.jpg'
import e3 from '../assets/e3.jpeg'


import HomePageNavbar from '../Footers/HomePage/HomePageNavbar'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Footers/Footer'
import UserContact from '../component/Contact/UserContact'
import Articles from '../component/articles/Articles'
import Services from '../component/service/Services'





export default function MyFinaceMateHome() {
    const navigate = useNavigate();

    const handleOnclick = () => {
        navigate('/login');
    };




    return (
        <>
        <HomePageNavbar/>
        <section className='w-auto h-auto font-serif' id="home">
            {/* get start */}   
            <div className='w-auto ml-10 pt-2 mt-4 mr-10 h-auto mb-20 pb-10 bg-neutral-50 rounded-lg shadow-lg'>
                    
                    <div className='flex text-[#6d8029]'>
                       <div className='flex-1 flex flex-col pt-32 gap-10 pl-36'>
                            <h2 className='text-[40px] m-2  font-sans font-bold antialiased drop-shadow-lg'>
                                Elevate Your Finance With <br />MYFinanceMate
                            </h2>
                            <span className='text-lg pl-5 font-semibold font-sans text-black'>Your Trusted Partner in Financial Success</span>
                            <div className='p-3'>
                                <button 
                                    className='get-btn text-white font-semibold px-6 py-3 rounded shadow transition duration-300' 
                                    onClick={handleOnclick}>
                                    Get Started
                                </button>
                            </div>
                        </div>
                        {/* left side image */}
                        <div className='flex-1'>
                            <div className='w-[450px] h-[450px] m-6 rounded-lg shadow-xl border-2 border-gray-300 p-3'>
                                <div className="relative w-fit">
                                    <img className="rounded" src={home1} alt="Background image" />
                                    <img className="w-[240px] rounded absolute bottom-0 left-0 -translate-x-20 translate-y-9 shadow-lg border-8 border-white" src={e3} alt="Foreground image" />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>


            {/* explore Our Service */}
            <Services/>
 
            {/* financial Articles */}
            <Articles/>


            {/* contact Us */}
            <UserContact/>

            <div>
                <Footer/>
            </div>
        </section>
        </>
    );
}
