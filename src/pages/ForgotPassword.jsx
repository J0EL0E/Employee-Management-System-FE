import React, { useState } from 'react'
import axios from 'axios';
import ThemedButton from '../components/ThemedButton';
import ThemedInput from '../components/ThemedInput';
import ThemedLabel from '../components/ThemedLabel';
import { useNavigate } from "react-router-dom";
import api from '../api/api.config';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
        email: "",
        password: "",
        new_password: ""
    });
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value}= e.target;
        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    //validation for password to be implemented
    const passwordChecking = () => {
        if(formData.password === formData.password){
            setMessage("Password is not the same!")
        }

    }

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            passwordChecking();
            setIsLoading(true);
            
            const response = await api.post(`${import.meta.env.VITE_API_HOST}/api/v1/user/forgot-password`, formData, {withCredentials: true});
            const responseData = response.data
            console.log(responseData);
            
            setInterval(() => {
                setIsLoading(false)
                navigate("/login");
            }, 2000);
            
        } catch(err) {
            setIsLoading(false);
            alert(err)
        }
    }

  return (
    <div className='w-full h-full flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center  w-[70%] md:w-[30%] h-1/2 mt-[10vh] rounded-md bg-white py-10 px-10 shadow-md'>
            <h1 className='text-black'>Forgot Password</h1>
            <div className='w-[90%] mt-5 flex flex-col items-start justify-start'>
                <ThemedLabel htmlFor="email" styling="w-auto text-black text-1rem mb-3" children={"Email Address"} />
                <ThemedInput id="email" type="text" value={formData.email} form_name="email" placeholder={"Enter Your Email"} handlerFunc={handleChange} styling="w-full text-black text-1rem rounded-md border-black border-solid border-2px" />
            </div>
            <div className='w-[90%] mt-5 flex flex-col items-start' >
                <ThemedLabel htmlFor="password" styling="w-auto text-black text-1rem mb-3" children={"Old Password"} />
                <ThemedInput id="password" type="text" value={formData.password} form_name="password" placeholder={"Enter Your Old Password"} handlerFunc={handleChange} styling="w-full text-black text-1rem rounded-md border-black border-solid border-2px mr-2px" />
            </div>
            <div className='w-[90%] mt-5 mb-5 flex flex-col items-start' >
                <ThemedLabel htmlFor="new_password" styling="w-auto text-black text-1rem mb-3" children={"New Password"} />
                <ThemedInput id="new_password" type="text" value={formData.new_password} form_name="new_password" placeholder={"Enter Your New Password"} handlerFunc={handleChange} styling="w-full text-black text-1rem rounded-md border-black border-solid border-2px mr-2px" />
            </div>
                {message && <span className='text-red-500 text-md'>{message}</span>}
                {/* <p className='text-black '>Already have an account <a href='/login'>Sign In</a></p> */}
                <ThemedButton type="submit" styling="w-3/4 rounded-sm px-10 py-5 mt-5" children={isLoading ? "Loading..." : "Confirm New Password"}/>
        </form>
    </div>
  )
}

export default ForgotPassword