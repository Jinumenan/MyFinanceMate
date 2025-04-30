import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TiSocialFacebook } from "react-icons/ti";
import { ImGooglePlus } from "react-icons/im";
import { TiSocialTwitter } from "react-icons/ti";

export default function SignUp({ toggle }) {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const onclick = () => {
    navigate('/signin');

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', data);
      navigate('/signin');
      console.log(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className='h-screen w-screen flex flex-row justify-center items-center font-serif'>
        <div className='bg-[#243B55] w-[500px] h-[550px] rounded-l-lg shadow-xl'>
          <h2 className='text-center text-3xl text-red-50 pt-[150px] '>Hello, Friend!</h2>
          <p className='text-center text-white text-xl mt-[50px] whitespace-normal'>To keep connected with us please <br/> login with your personal info</p>
          <div className='flex justify-center mt-10 text-white'>
            <button onClick={onclick} className='border-solid border-2 border-white p-2 pr-6 pl-6 rounded-full '>SIGN IN</button>
          </div>
        </div>

        {/* right side div  */}
        <div className='bg-[#f6f5f7] w-[700px] h-[550px] rounded-r-lg shadow-xl'>
          <h2 className='text-3xl text-center mt-10 pb-4'>Create Account</h2>
          <div className='p-2 flex justify-center space-x-4'>
            <a href="#" aria-label="Facebook" className="text-blue-400 border-solid border-2 border-sky-900 p-2 rounded-full">
              <TiSocialFacebook size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="text-blue-400 border-solid border-2 border-sky-900 p-2 rounded-full">
              <ImGooglePlus size={24} />
            </a>
            <a href="#" aria-label="Twitter" className="text-blue-400 border-solid border-2 border-sky-900 p-2 rounded-full">
              <TiSocialTwitter size={24} />
            </a>
          </div>
          <div className='flex justify-center p-4'>
            <span>or use your email for registration</span>
          </div>
          <form className='flex flex-col items-center' onSubmit={handleSubmit}>
            <div className='flex items-center '>
              <i className="fas fa-envelope text-gray-500 mr-3"></i>
              <input className=' outline-none border border-slate-300  p-3 w-[350px] rounded-md border-b-4' 
                autocomplete="off" 
                type="name" 
                placeholder="Name" 
                name="name" 
                value={data.name}
                onChange={handleChange}
              />
            </div>
            <div className='flex items-center '>
              <i className="fas fa-envelope text-gray-500 mr-3"></i>
              <input className=' outline-none border border-slate-300 hover:border-slate-200 p-3 w-[350px] rounded-md mt-4' 
                autocomplete="off" 
                type="email" 
                placeholder="Email" 
                name="email" 
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className='flex items-center '>
              <i className="fas fa-envelope text-gray-500 mr-3"></i>
              <input className=' outline-none border border-slate-300 hover:border-slate-200 p-3 w-[350px] rounded-md mt-4' 
                // autocomplete="off" 
                type="password" 
                placeholder="password" 
                name="password" 
                value={data.password}
                onChange={handleChange}
              />
            </div>
            {/* <div className='flex items-center '>
              <i className="fas fa-lock text-gray-500 mr-3"></i>
              <input className=' outline-none border border-slate-300 hover:border-slate-200 p-3 w-[350px] rounded-md mt-4' 
                autocomplete="new-password" 
                type="password" 
                placeholder="Password" 
                value={data.password}
                onChange={handleChange}
              />
            </div> */}
            <button type='submit' className='border-solid border-2 border-sky-900 p-2 w-[200px] rounded-full'>SIGN UP</button>
          </form>
          <div className='flex flex-col'>
            <a href="#" className='text-center p-4 mt-4 text-red-500 ' >Forgot your password?</a>
            <div className=' flex justify-center mt-4'>
              {error && <p className='text-red-500'>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

