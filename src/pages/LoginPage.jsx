
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemedButton from '../components/ThemedButton';
import ThemedInput from '../components/ThemedInput';
import ThemedLabel from '../components/ThemedLabel';
import api from '../api/api.config';


const LoginPage = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false)
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

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            setIsLoading(true)
            const response = await api.post(`${import.meta.env.VITE_API_HOST}/api/v1/user/login`, formData, {withCredentials: true});
            const responseData = response.data
            console.log(responseData);

            setInterval(() => {
            setIsLoading(false)
            navigate("/")
            }, 2000);

        } catch(err) {
            setIsLoading(false)
            console.log(err)
            alert(err)
        }

    }

  return (
    <div className='w-full h-full flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center mt-[10vh] w-[70%] md:w-[30%]  h-1/2 rounded-md bg-white py-10 px-10 shadow-md'>
        <h1 className='text-black'>Login</h1>
        <div className='w-[90%] mt-5 flex flex-col items-start justify-start'>
            <ThemedLabel htmlFor="email" styling="w-auto text-black text-1rem mb-3" children={"Email Address"} />
            <ThemedInput 
                id="email" 
                type="text" 
                value={formData.email} 
                form_name="email" 
                placeholder={"Enter Your Email"}
                handlerFunc={handleChange} styling="w-full text-black text-1rem rounded-md border-black border-solid border-2px" />
        </div>
        <div className='w-[90%] mt-5 mb-5 flex flex-col items-start' >
            <ThemedLabel htmlFor="password" styling="w-auto text-black text-1rem mb-3 self-start" children={"Password"} />
            <div className='w-full flex'>
                <ThemedInput 
                 id="password" 
                 type={showPassword ? "text": "password"  } 
                 value={formData.password} 
                 form_name="password" handlerFunc={handleChange}
                 placeholder={"Enter Your Password"}
                 styling="w-full text-black text-1rem rounded-md border-black border-solid border-2px mr-2px" />
                <button style={{backgroundColor: 'white'}} type="button" onClick={handleShowPassword} className="w-[15%] h-auto text-black bg-white pt-2px mx-5px flex justify-center items-center">
                    <span  className= "text-[.7rem]">
                        {showPassword ? "HIDE" : "SHOW"}
                    </span>
                </button>
            </div>
            <a href="/forgot-password" className='self-end mt-2 text-[0.9rem]'>Forgot Password?</a>
        </div>
        <p className='text-black text-[0.9rem]'>Don't have an account <a href='/register'>Register</a></p>
            <ThemedButton type="submit" styling="w-3/4 rounded-sm px-10 py-5 mt-5" children={isLoading ? "Loading..." : "Sign In"}/>
    </form>
    </div>
    
  )
}

export default LoginPage