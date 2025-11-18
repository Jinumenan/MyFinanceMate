import React, { useEffect, useState } from 'react'
import useUserAuth from '../../hooks/useUserAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import { API_PATHS } from '../../Utils/apiPath';
import axiosInstance from '../../Utils/axiosinstance';

export default  function AiVoice() {

const [textInput, setTextInput] = useState('');
const { isListening, startListening, stopListening, transcript } = useUserAuth({
      continuous: true,
});

    // Effect to update text input when not listening
useEffect(() => {
    if (!isListening && transcript.trim() !== '') {
      setTextInput(prevVal => prevVal + (prevVal.length ? ' ' : '') + transcript);
    }
}, [isListening, transcript]);


const startStopListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
};

const clearText = () => {
    setTextInput('');
};

const sendText = async () => {
    if (!textInput.trim()) return toast.warning("Please enter a message first");

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return toast.error("Authentication token is missing.");
        }

        const res = await axiosInstance.post(API_PATHS.VOICE.CREATE, { message: textInput });

        if (res.status === 200) {
            toast.success("Message sent successfully");
        } else {
            toast.error("Error: " + res.data.message);
        }
    } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Server connection error");
    }
};

  return (
    <>
    <div className='flex pt-20 justify-center items-center'>
      <div className="block w-[400px] m-0 auto text-center">
        <button 
          onClick={startStopListening} 
          className='bg-green-600 text-white font-bold py-3 px-10 rounded-full hover:bg-blue-700 transition-colors duration-300'
        >
          {isListening ? 'Stop Listening' : 'Speak'}
        </button>
        <textarea 
          className='mt-5 w-full h-[200px] p-8 transition-colors border border-gray-300 rounded-2xl bg-gray-100 text-gray-800'
          disabled={isListening}
          value={isListening ? textInput + (transcript.length ? (textInput.length ? ' ' : '') + transcript : '') : textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Type your text here..."
        />
        <div className="flex justify-between mt-4">
          <button 
            onClick={clearText} 
            className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600"
          >
            Clear
          </button>
          <button 
            onClick={sendText} 
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}
