import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Utils/axiosinstance'; 
import { API_PATHS } from '../../Utils/apiPath';
export default function MessageList() {
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
          const res = await axiosInstance.get(API_PATHS.VOICE.GET_ALL_VOICE);
          setMessages(res.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
    
      useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
      }, []);
    
      const toggleReadStatus = async (id, currentStatus) => {
        const path = currentStatus ? API_PATHS.VOICE.UNREAD : API_PATHS.VOICE.READ;
        try {
          await axiosInstance.patch(path.replace(":id", id));
          fetchMessages();
        } catch (error) {
          console.error('Error updating read status:', error);
        }
      };
    
      //delete meessage
      const deleteMessage = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this message?");
        if (!confirmDelete) return;
    
        try {
          await axiosInstance.delete(API_PATHS.VOICE.DELETE.replace(":id", id));
          fetchMessages();
        } catch (error) {
          console.error('Error deleting message:', error);
        }
      };

  return (
    <>
      <div className="p-6 max-h-64 overflow-y-auto space-y-4">
        <h2 className="text-xl font-bold mb-4">All Messages</h2>
        <ul className="space-y-4">
          {messages.map(msg => (
            <li
              key={msg._id}
              className={`p-4 rounded shadow ${
                msg.read ? 'bg-green-100' : 'bg-gray-100'
              } flex justify-between items-center`}
            >
              <div>
                <p>{msg.message}</p>
                <p className="text-sm text-gray-600">Status: {msg.read ? 'Read' : 'Unread'}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={msg.read}
                  onChange={() => toggleReadStatus(msg._id, msg.read)}
                  className="w-5 h-5 accent-green-500"
                />

                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>  )
}
