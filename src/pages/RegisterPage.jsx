import React, { useState } from 'react';
import axios from 'axios';
import ThemedButton from '../components/ThemedButton';
import ThemedInput from '../components/ThemedInput';
import ThemedLabel from '../components/ThemedLabel';
import { useNavigate } from "react-router-dom";
import api from '../api/api.config';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
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

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            setIsLoading(true);

            const response = await api.post(`${import.meta.env.VITE_API_HOST}/api/v1/user/register`, formData, {withCredentials: true});
            const responseData = response.data
            console.log(responseData);

            setInterval(() => {
                setIsLoading(false);
                navigate("/")
            }, 2000);
            
        } catch(err) {
            setIsLoading(false)
            alert(err)
        }
    }

  return (    
    <div className='w-full h-full flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-[70%] md:w-[30%]  h-1/2 mt-[10vh] rounded-md bg-white py-10 px-10 shadow-md'>
            <h1 className='text-black'>Register</h1>
            <div className='w-[90%] mt-5 flex flex-col items-start justify-start'>
                <ThemedLabel htmlFor="email" styling="w-auto text-black text-1rem mb-3" children={"Email Address"} />
                <ThemedInput id="email" type="text" value={formData.email} form_name="email" placeholder={"Enter Your Email"} handlerFunc={handleChange} styling="w-full text-black text-1rem rounded-md border-black border-solid border-2px" />
            </div>
            <div className='w-[90%] mt-5 mb-5 flex flex-col items-start' >
                <ThemedLabel htmlFor="password" styling="w-auto text-black text-1rem mb-3" children={"Password"} />
                <ThemedInput id="password" type="text" value={formData.password} form_name="password" placeholder={"Enter Your Password"} handlerFunc={handleChange} styling="w-full text-black text-1rem rounded-md border-black border-solid border-2px mr-2px" />
            </div>
            <p className='text-black '>Already have an account <a href='/login'>Sign In</a></p>
                <ThemedButton type="submit" styling="w-3/4 rounded-sm px-10 py-5 mt-5" children={isLoading ? "Loading" : "Register"}/>
        </form>

    </div>
  )
}

export default RegisterPage