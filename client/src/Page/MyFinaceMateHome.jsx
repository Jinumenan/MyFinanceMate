import React from 'react'
import graph_1 from '../assets/graph_1.png'
import graph_2 from '../assets/graph_2.png'
import home1 from '../assets/Home2.jpg'
import strategy from '../assets/strategy.png'
import analysis2 from '../assets/analysis2.jpeg'
import HomePageNavbar from '../Footers/HomePage/HomePageNavbar'
import { useNavigate } from 'react-router-dom'



export default function MyFinaceMateHome() {
    const navigate = useNavigate();

    const handleOnclick = () => {
        navigate('/login');
    };

    return (
        <div className='w-auto h-auto font-serif'>
            {/* navbar */}
            <div className='w-auto h-[100px] pt-4'>
                <HomePageNavbar />
            </div>

            {/* get start */}
            <div className='flex w-auto h-auto mb-20 bg-yellow-50 shadow-lg'>
                <div className='flex-1 flex-row pt-32 gap-10 pl-36'>
                    <h2 className='text-[40px] m-2 p-2 font-sans font-bold antialiased text-shadow-lg/30 '>Elevate Your Finance With <br />MYFinanceMate </h2>
                    <span className='text-lg pl-5 font-semibold font-sans'>Your Trusted Partner in Financial Success</span>
                    <div className='p-3 '>
                        {/* <button className='bg-orange-100 w-auto h-[40px] rounded-md pl-16 m-4 pr-14 shadow-sm  '>View More</button> */}
                        <button className='get-btn' onClick={handleOnclick}>Get Start</button>
                    </div>
                </div>

                <div className='flex-1'>
                    <div className='w-[500px] h-[500px] m-6 rounded-lg shadow-lg mask-origin-border border-3 p-3.5  '>
                    <img src={home1} />
                    </div>
                </div>
            </div>

            {/* explore Our Service */}
            <div className='flex w-auto h-auto mt-4'>
                {/* left side */}
                <div className='flex-row p-10'>
                    <div className='flex-row w-auto h-auto ml-10'>
                        <div className='pl-48 pt-12'>
                            <h2 className='text-4xl mb-4 pl-4 font-sans font-bold antialiased '>Explore Our Services </h2>
                            <span className='text-sm pl-4 font-semibold font-sans'>Your Trusted Partner in Financial Success</span><br />
                            <button className='bg-orange-100 w-auto h-[40px] rounded-md pl-14 m-4 pr-14 underline underline-offset-2'>View More</button>
                        </div>
                    </div>

                    <div className='flex flex-row m-6'>
                        <div className='m-2 pl-48 ml-8 '>
                            <div className='w-[160px] h-[200px] bg-black'></div>
                            <p>Credit Card</p>
                            <p>Earn Rewards on Every<br /> Purchase</p>
                        </div>
                        <div className='ml-4 mt-2'>
                            <div className='w-[160px] h-[200px] bg-black'></div>
                            <p>Credit Card</p>
                            <p>Earn Rewards on Every<br /> Purchase</p>
                        </div>
                    </div>
                </div>
                {/* right side */}
                <div className='flex-1 w-auto h-auto ml-6 p-10'>
                    <div className='w-[400px] h-[400px] m-14 ml-32 bg-black'></div>
                </div>
            </div>

            {/* latest inside */}
            <div className=' w-auto h-auto'>
                <div className='pt-14'>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-bold mb-2">Latest Insights</h2>
                        <p className="text-gray-600 mb-4">Stay informed with our expert financial advice</p>
                        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Read More</button>
                    </div>
                </div>

                <div className='flex pb-20 items-center justify-center'>
                    <div className='pl-12'>
                        <div className='flex-col justify-evenly align-center' >
                            <div className='border border-light-100 w-auto h-auto mt-16'>
                                <div className='flex flex-row m-2' >
                                    <div className='bg-black w-[90px] h-[90px] '><img src={strategy} /></div>
                                    <div className='mt-3'>
                                        <h2 className='text-2xl pl-4  font-sans font-bold antialiased '>Investment Strategies</h2>
                                        <span className=' pl-4 font-semibold font-sans text-wrap'>Learn how to maximize your investment.</span> <br />
                                    </div>
                                </div>
                            </div>

                            {/* <div className='border border-light-100 w-auto h-auto mt-14'>
                                <div className='flex flex-row m-2' >
                                    <div className='bg-black w-[90px] h-[90px]'></div>
                                    <div className='mt-3'>
                                        <h2 className='text-2xl pl-4  font-sans font-bold antialiased '>Recent Updates </h2>
                                        <span className='text-sm pl-4 font-semibold font-sans'>Stay informed with the latest news.</span> <br />
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className='pl-12'>
                        <div className='flex-col justify-evenly' >
                            <div className='border border-light-100 w-auto h-auto mt-16'>
                                <div className='flex flex-row m-2 ' >
                                    <div className='bg-black w-[90px] h-[90px]'></div>
                                    <div className='mt-3'>
                                        <h2 className='text-2xl pl-4  font-sans font-bold antialiased '>Financial Planning Tips </h2>
                                        <span className='text-right pl-4 font-semibold font-sans'>Create a roadmap for your financial goals.</span> <br />
                                    </div>
                                </div>
                            </div>
                            {/* <div className='border border-light-100 w-auto h-auto mt-14'>
                                <div className='flex flex-row m-2' >
                                    <div className='bg-black w-[90px] h-[90px]'></div>
                                    <div className='mt-3'>
                                        <h2 className='text-2xl pl-4  font-sans font-bold antialiased '>Recent Updates </h2>
                                        <span className='text-sm pl-4 font-semibold font-sans'>Stay informed with the latest news.    </span>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Update */}
            <div className='flex w-auto h-auto mt-4 bg-yellow-50'>
                {/* right side */}
                <div className='flex-row pl-20'>
                    <div className='w-[400px] h-[400px] m-14 ml-56 rounded-lg shadow-lg mask-origin-border border-3 '>
                    <img src={analysis2} />
                    </div>
                </div>
                {/* left side */}
                <div className='flex-1 w-auto h-auto'>
                    <div className='flex-row w-auto h-auto ml-4'>
                        <div className='pl-12 pt-20'>
                            <h2 className='text-4xl mb-4 pl-4  font-sans font-bold antialiased '>Recent Updates </h2>
                            <span className='text-sm pl-4 font-semibold font-sans'>Stay informed with the latest news.</span> <br />
                            <button className='bg-orange-100 w-auto h-[40px] rounded-md pl-14 m-4 pr-14 underline underline-offset-4 '>Read More</button>
                        </div>
                    </div>

                    <div className='flex flex-row mt-8'>
                        <div className='m-2  ml-20'>
                            <div src className='w-[150px] h-[150px] bg-white rounded-lg'>
                                <img src={graph_1} />
                            </div>

                        </div>
                        <div className='m-2'>
                            <div src className='w-[150px] h-[150px] bg-white'>
                                <img src={graph_2} alt="" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* financial Articlies */}
            <div className='w-auto h-auto mt-4 pb-20'>
                {/* up information */}
                <div className='flex flex-row justify-center'>
                    <div className='flex flex-col pt-24 pr-12'>
                        <div className=' w-auto h-auto pl-2 pb-1'>
                            <div className='' >
                                <h2 className='text-4xl font-sans font-bold antialiased mb-4'>Financial Articlies </h2>
                                <span className='text-sm font-semibold font-sans'>Stay informed with the latest news.</span> <br />
                                <button className='bg-orange-100 w-auto h-[40px] rounded-md pl-14 pr-14 underline underline-offset-4 mt-4'>Read More</button>
                            </div>
                        </div>
                        <div className='border border-light-100 w-auto h-auto mt-24'>
                            <div className='flex flex-row m-2 ' >
                                <div className='bg-black w-[90px] h-[90px]'></div>
                                <div className='mt-3'>
                                    <h2 className='text-2xl pl-4  font-sans font-bold antialiased '>Budgeting Tips  </h2>
                                    <span className='text-sm pl-4 font-semibold font-sans'>Learn how to create a budget thatworks for you.</span> <br />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col pt-24 pl-4'>
                        <div className='w-auto h-auto pl-48'>
                            <div className='bg-slate-950 w-[180px] h-[180px]'></div>
                        </div>
                        <div className='border border-light-100 w-auto h-auto mt-14'>
                            <div className='flex felx-row m-2'>
                                <div className='bg-black w-[90px] h-[90px]'></div>
                                <div className='mt-3'>
                                    <h2 className='text-2xl pl-4  font-sans font-bold antialiased '>Inverstment Stategies</h2>
                                    <span className='text-sm pl-4 font-semibold font-sans'>Discover different inverstment options for your future.</span> <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
