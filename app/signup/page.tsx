"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addUser } from '@/store/slices/authSlice';
import { toast } from "react-toastify";
import axios from 'axios';
import Link from 'next/link';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Cookies from 'js-cookie';

// Email validation regex
const emailRegex = new RegExp('^\\w[\\w.-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,}$');

interface User {
    name: string;
    email: string;
    password: string;
}

export default function Register() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // const {user, token} = useSelector((state: RootState) => state.authUser)
  const dispatch = useDispatch()
  const router = useRouter();
 
  // Focus on name input when the component loads
  useEffect(() => {
    if(nameRef.current){
        nameRef.current.focus();
    }
    
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const user = {
      name: nameRef.current ? nameRef.current.value : "",
      email: emailRef.current ? emailRef.current.value : "",
      password: passwordRef.current ? passwordRef.current.value : "",
    };
  
    if (validateUser(user)) {
      try {
        const signUpResponse = await axios.post("http://localhost:3008/user/signup", user);
        console.log(signUpResponse.data.data.token);
        if(signUpResponse.data.errCode === -1){
          const token = signUpResponse.data.data.token
          dispatch(addUser({user: {email: signUpResponse.data.data?.email || "", username: signUpResponse.data.data?.username || ""}, token: signUpResponse.data.data.token}))
          Cookies.set("token", token, {expires: 7})
          router.push("/");
        }
      } catch (error) {
        if(axios.isAxiosError(error)){
          console.log("---->>",error?.response?.data)

          toast.error(error.response?.data.error || "An error occurred during sign-up." )
        }else{
          console.error("Unknown Error:", error);
          toast.error("An unexpected error occurred.");
        }
        
        
        // toast.error(error)
      }
    }
  };

  const validateUser = (user: User) => {
    if (user.name === '') {
      setNameError("Name shouldn't be empty");
      return false;
    } else {
      setNameError('');
    }

    if (user.email === '') {
      setEmailError("Email shouldn't be empty");
      return false;
    } else if (!emailRegex.test(user.email)) {
      setEmailError("Please provide a valid email");
      return false;
    } else {
      setEmailError('');
    }

    if (user.password === '') {
      setPasswordError("Password shouldn't be empty");
      return false;
    } else {
      setPasswordError('');
    }

    return true;
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
    {/* Adjusted width to w-96 for a wider form */}
    <div className="registerForm bg-white rounded shadow-md text-center flex flex-col w-96 gap-7 p-5 pr-12" style={{ padding: '2.25rem', width: '34rem' }}>
      <h1 className="text-5xl font-bold text-left">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7 pl-7" encType="multipart/form-data">
        {/* Name Input */}
        <input
          type="text"
          placeholder="Name"
          ref={nameRef}
          className={`border p-2 rounded ${nameError ? 'border-red-500' : 'border-gray-300'}`}
        />
        {nameError && <p className="text-red-500 text-left">{nameError}</p>}
  
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          className={`border p-2 rounded ${emailError ? 'border-red-500' : 'border-gray-300'}`}
        />
        {emailError && <p className="text-red-500 text-left">{emailError}</p>}
  
        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className={`border p-2 rounded ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
        />
        {passwordError && <p className="text-red-500 text-left">{passwordError}</p>}
  
        {/* Submit Button */}
        <div className="text-right">
          <input
            type="submit"
            value="Sign Up"
            className="text-white w-24 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-5 py-2.5 mb-2"
          />
        </div>
      </form>
  
      {/* Link to Sign In */}
      <p className="text-left">
        Already have an account? 
        <Link href="/signin">
        <span className="text-blue-400 ml-2">Sign in</span>
        </Link>
      </p>
    </div>
    <ToastContainer position="top-right" autoClose={3000} />
  </div>
  
  );
}
