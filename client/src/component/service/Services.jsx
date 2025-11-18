import React from 'react'

import latest_inside01 from '../../assets/latest_inside01.jpg'
import credit_card from '../../assets/c2.jpg'
import savings_account from '../../assets/s2.jpeg'

import latest_inside02 from '../../assets/latest_inside02.jpg'
import retirement_planning_pic from '../../assets/retirement_planning_pic.jpg'
import tex_saving_pic from '../../assets/tex_saving_pic.jpg'
import e3 from '../../assets/e3.jpeg'  

export default function() {

    const goToService = () => {
    navigate('/service');
  };
  return (
    <section id='service'>
        <div className='flex w-auto h-auto mt-4'>
            {/* left side */}
            <div className='flex-row p-10'>
                <div className='flex-row w-auto h-auto ml-5'>
                    <div className='pl-48 pt-12'>
                        <h2 className='text-4xl mb-4 pl-4 font-sans font-bold antialiased text-[#8da242]'>
                            Explore Our Services
                        </h2>
                        <span className='text-sm pl-4 font-semibold font-sans text-slate-700'>
                            Your Trusted Partner in Financial Success
                        </span>
                        <br />
                        <button
                            onClick={goToService}
                            className='get-btn text-white px-4 py-2 rounded transition'
                            >
                            View More
                        </button>
                    </div>
                </div>
        
                <div className='flex flex-row m-6'>
                    <div className='m-2 ml-48 max-w-sm items-center gap-x-4 rounded-xl bg-white p-4 outline outline-gray-200'>
                        <div className='w-[160px] h-[200px]'>
                            <img src={credit_card} />
                        </div>
                        <p className='text-[#6d8029] font-semibold'>Credit Card</p>
                        <p className='text-slate-700'>Earn Rewards on Every</p>
                    </div>
                    <div className='ml-4 mt-2 max-w-sm items-center gap-x-4 rounded-xl bg-white p-4 outline outline-gray-200'>
                        <div className='w-[160px] h-[200px]'>
                            <img src={savings_account} />
                        </div>
                        <p className='text-[#6d8029] font-semibold'>Savings Account</p>
                        <p className='text-slate-700'>High Interest Savings</p>
                    </div>
                </div>
            </div>
                    {/* right side */}
            <div className='flex-1 w-auto h-auto ml-6 p-10'>
                <div className='w-[400px] h-[400px] m-14 ml-32 rounded-lg shadow-xl mask-origin-border border-3 p-3.5'>
                    <img src={e3} />
                </div>
            </div>
        </div>
        
                {/* latest inside */}
        <div className='w-auto h-auto'>
            <div>
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-2xl font-bold mb-2 text-[#8da242]'>Latest Insights</h2>
                    <p className='text-slate-700 mb-4'>Stay informed with our expert financial advice</p>
                    <button className='get-btn text-white px-4 py-2 rounded transition'>
                        Read More
                    </button>
                </div>
            </div>
        
            <div className='flex pb-20 items-center justify-center'>
                <div className='mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-4 outline outline-gray-200'>
                    <img className='size-24 shrink-0' src={latest_inside02} alt='Investment Strategies' />
                    <div>
                        <div className='text-xl font-medium text-[#6d8029]'>Investment Strategies</div>
                        <p className='text-slate-700'>Learn how to maximize your investment.</p>
                    </div>
                </div>
        
                <div className='mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-4 outline outline-gray-200'>
                    <img className='size-24 shrink-0' src={latest_inside01} alt='Financial Planning Tips' />
                    <div>
                        <div className='text-xl font-medium text-[#6d8029]'>Financial Planning Tips</div>
                        <p className='text-slate-700'>Learn how to maximize your investment.</p>
                    </div>
                </div>
            </div>

            <div className='flex pb-20'>
                <div className='mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-4 outline outline-gray-200'>
                    <img className='size-24 shrink-0' src={retirement_planning_pic} alt='Investment Strategies' />
                    <div>
                        <div className='text-xl font-medium text-[#6d8029]'>Retirement Planning</div>
                        <p className='text-slate-700'>
                            Plan early to secure a comfortable and stress-free retirement
                        </p>
                    </div>
                </div>
        
                <div className='mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-4 outline outline-gray-200'>
                    <img className='size-24 shrink-0' src={tex_saving_pic} alt='Financial Planning Tips' />
                    <div>
                        <div className='text-xl font-medium text-[#6d8029]'>Tax Saving Techniques</div>
                        <p className='text-slate-700'>
                            Discover smart ways to reduce your tax burden legally
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
  )
}
