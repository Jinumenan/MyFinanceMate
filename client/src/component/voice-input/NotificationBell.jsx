import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Model';
import axiosInstance from '../../Utils/axiosinstance'; 
import { API_PATHS } from '../../Utils/apiPath';


export default function NotificationBell() {
    const [messages, setMessages] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);


      // Fetch all messages from the backend using axios
  const fetchMessages = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.VOICE.GET_ALL_VOICE); // Use the API path
      const unread = res.data.filter(msg => !msg.read);
      setMessages(res.data);
      setUnreadMessages(unread);
      setUnreadCount(unread.length);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="relative">
      <button onClick={() => setShowDropdown(!showDropdown)}>
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && unreadMessages.length > 0 && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg p-4 rounded w-64 z-10">
          <div className="flex justify-between items-center">
            <p className="text-sm">{unreadMessages[0]?.message}</p>
            <button onClick={() => setShowDropdown(false)} className="text-gray-400">❌</button>
          </div>
          <button
            onClick={() => {
              setShowModal(true);
              setShowDropdown(false);
            }}
            className="text-blue-600 text-xs underline mt-2"
          >
            View & Mark as Read
          </button>
        </div>
      )}

      {showModal && (
        <Modal
          messages={messages}
          onClose={() => setShowModal(false)}
          onUpdate={fetchMessages} // Update the messages after closing modal
        />
      )}
    </div>
      </>
  );
}
