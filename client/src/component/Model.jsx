import React, { useEffect, useState } from 'react';
import { API_PATHS } from '../Utils/apiPath';
import axiosInstance from '../Utils/axiosinstance';

export default function Modal({children, isOpen, onClose, title, messages = [], onUpdate}) {
    const [latestUnread, setLatestUnread] = useState(null);
    const [checked, setChecked] = useState(false);
  
    useEffect(() => {
      if (messages.length > 0) {
        const unread = messages.find(msg => !msg.read);
        setLatestUnread(unread);
      }
    }, [messages]);
  
    const handleCheckboxChange = async () => {
      if (!latestUnread) return;
  
      setChecked(true);
  
      try {
        await axiosInstance.patch(
          API_PATHS.VOICE.READ.replace(":id", latestUnread._id)
        );
        if (onUpdate) onUpdate(); // trigger refresh
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    };
  
    if(!isOpen) return null;

  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden  bg-black/20 bg-opacity-50'>
        <div className='relative p-6 w-full max-w-2xl '>
            {/* content */}
            <div className='relative bg-white rounded-lg shadow-sm dark:bg-white '>
                
                {/* header */}
                <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200'>
                    <h3 className='teext-lg font-medium text-gray-900 dark:text-black '>
                        {title}
                    </h3>

                    <button 
                        type = "button"
                        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>

                {/* body */}
                <div className='p-4 md:p-5 space-y-4'>
                {latestUnread ? (
              <>
                <p className="text-gray-800">{latestUnread.message}</p>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-green-500"
                  />
                  <span className="text-gray-700">Mark as Read</span>
                </label>
              </>
            ) : (
              children || <p>No new messages</p>
            )}                </div>
            </div>
        </div>
    </div>
  )
}
