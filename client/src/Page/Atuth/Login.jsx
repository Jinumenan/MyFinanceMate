import React, { useContext, useState } from 'react'
import AuthLayouts from '../../component/layouts/AuthLayouts'
import {Link, useNavigate} from  "react-router-dom"
import Input from '../../component/Inputs/input';
import SignUp from '../Atuth/SignUp';
import { validateEmail } from '../../Utils/helper'; // Assuming you have a utility function for email validation
import axiosInstance from '../../Utils/axiosinstance';
import { API_PATHS } from '../../Utils/apiPath';
import { UserContext } from '../../context/UserContext';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const {updateUser} = useContext(UserContext);

    const navigate = useNavigate()

    //Handle Login form Submit
    const handleLogin = async (e) => {
        e.preventDefault()
        setError(null)

        // Validate input fields
        if (!validateEmail(email)) {
            setError('Please enter a valid email address')
            return;
        }
        if (!password) {
            setError('Plaease enter your password')
            return;
        }

        setError("");

        console.log("Trying to login with:", email, password);

        //login API Call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
                email,
                password,
            });
            const {token, user} = response.data;

            if(token){
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                updateUser(user)
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            }else{
                setError("somethinsg went wrong, please try again");
            }
        }
    }

  return (
    <>
        <AuthLayouts>
                <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center px-4">
                    <h3 className="text-xl font-semibold text-black">Welcome Back!</h3>
                    <p className="text-xs text-slate-700 mt-[5px] mb-7">
                        Enter your credentials to login to your account
                    </p>
                    <div>
                            <form onSubmit={handleLogin} className="flex flex-col">
                                <Input 
                                    label="Email Address"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={({target}) => setEmail(target.value)}
                                />

                                <Input
                                    className="mt-4 p-4"
                                    value={password}
                                    onChange={({target}) => setPassword(target.value)}
                                    label="Password"
                                    placeholder="Min 8 characters"
                                    type="password"
                                />
                                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                                <button 
                                    type="submit" 
                                    className=" text-black border border-yellow-500 rounded-md py-2 mt-4 hover:bg-yellow-500 hover:text-white transition duration-200 ease-in-out" 
                                    >
                                        Login
                                    </button>

                                <p className="text-xs text-slate-700 mt-4">
                                    Don't have an account? {" "}
                                    <Link className="text-red-600 font-medium text-primary underline cursor-pointer" to = "/SignUp">
                                        Sign Up
                                    </Link>   
                                </p>
                            </form>
                    </div>
                </div>

        </AuthLayouts>
    </>
  )

}