import React from 'react'
import graph_2 from '../../assets/graph_2.png'
import graph_1 from '../../assets/graph_1.png'
import analysis2 from '../../assets/analysis2.jpeg'
export default function Articles() {
  return (
    <section id='articles'>
        <div className='w-auto h-auto mt-4 pb-20 bg-neutral-50 rounded-lg shadow-lg mx-10'>
            {/* up information */}
            <div className='flex flex-row justify-center'>
                <div className='flex flex-col pt-24 pr-12'>
                <div className='w-auto h-auto pl-2 pb-1'>
                    <div>
                    <h2 className='text-4xl font-sans text-[#8da242]  font-bold antialiased mb-4'>Financial Articles</h2>
                    <span className='text-sm font-semibold font-sans'>Stay informed with the latest news.</span> <br />
                    <button className='get-btn'>Read More</button>
                    </div>
                </div>
                <div className='w-auto h-auto mt-24'>
                    <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-4 outline outline-black/5 dark:bg-white dark:shadow-md dark:-outline-offset-1 dark:outline-white/10">
                    <img className="size-24 shrink-0" src={graph_2} alt="Budgeting Tips" />
                    <div>
                        <div className="text-xl font-medium text-indigo-800 ">Budgeting Tips</div>
                        <p className="text-slate-700 dark:text-gray-400">Learn how to create a budget that works for you.</p>
                    </div>
                    </div>
                </div>
                </div>

                <div className='flex flex-col pt-24 pl-4'>
                <div className='w-auto h-auto pl-48'>
                    <div className='bg-slate-950 w-[180px] h-[180px] rounded-lg shadow-lg'>
                    <img src={analysis2} alt="Analysis" />
                    </div>
                </div>
                <div className=' w-auto h-auto mt-14'>
                    <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-4 outline outline-black/5 dark:bg-white dark:shadow-md dark:-outline-offset-1 dark:outline-white/10">
                    <img className="size-24 shrink-0" src={graph_1} alt="Investment Strategies" />
                    <div>
                        <div className="text-xl font-medium text-indigo-800 ">Investment Strategies</div>
                        <p className="text-slate-700 dark:text-gray-400">Discover different investment options for your future.</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
  )
}
