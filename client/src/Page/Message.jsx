import React from 'react'
import Navbar from '../Footers/Navbar'
import AiVoice from '../component/voice-input/AiVoice'
import MessageList from '../component/voice-input/MessageList'

export default function Message() {
  return (
        <div className='w-auto h-auto font-serif'>
            <div className='mt-4'>
                <Navbar/>
            </div>
            <div activeMenu = "Message">
                <AiVoice/>
                <MessageList/>
            </div>



        </div>
  )
}
