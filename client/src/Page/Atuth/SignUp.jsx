import React, { useContext, useState } from 'react';
import AuthLayouts from '../../component/layouts/AuthLayouts';
import { Link, useNavigate } from "react-router-dom";
import Input from '../../component/Inputs/input';
import { validateEmail } from '../../Utils/helper'; // Assuming you have a utility function for email validation
import ProfilePhtoSelecter from '../../component/Inputs/ProfilePhtoSelecter';
import { API_PATHS } from '../../Utils/apiPath';
import axiosInstance from '../../Utils/axiosinstance';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../Utils/uploadImage'; //  added missing import (just in case)

export default function SignUp() {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle SignUp form Submit
  const handleSingUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError('Please enter your full name');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setError("");

    try {
      // upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || ""; // corrected key name (imageUrl not imagUrl)
      }
      
      // Corrected path here from REGISTER to SIGNUP
      const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, please try again");
      }
    }
  };

  return (
    <AuthLayouts>
      <div className="lg:w-[100%] h-auto md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-gray-500 mt-[5px] mb-6">
          Join Us today by entering your details below.
        </p>
        <form onSubmit={handleSingUp} className="flex flex-col">
          <ProfilePhtoSelecter image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              label="Full Name"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              className="border border-gray-300 rounded-md"
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <div className='col-span-2'>
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            className="text-black border border-yellow-500 rounded-md py-2 mt-4 hover:bg-yellow-500 hover:text-white transition duration-200 ease-in-out"
          >
            Sign Up
          </button>

          <p className="text-xs text-slate-700 mt-4">
            Already have an account?{" "}
            <Link className="text-red-600 font-medium underline cursor-pointer" to="/Login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayouts>
  );
}
