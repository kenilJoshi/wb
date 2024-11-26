// pages/Login.tsx
"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '@/store/slices/authSlice';
// import { RootState } from '@/store/store';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import Link from 'next/link';

const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const dispatch = useDispatch()
  // const {user, token} = useSelector((state: RootState) => state.authUser)
  const router = useRouter();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
    };

    if (validateInfo(user)) {
      try {
        const signUser = await axios.post('http://localhost:3008/user/signin', user);
        if(signUser.data.errCode === -1){
          // let token = signUser.data.data.token
          dispatch(addUser({user: {
            email: signUser.data.data.email || "",
            username: signUser.data.data.username || ""
          },
          token: signUser.data.data.token}))
          Cookies.set("token", signUser.data.data.token)
          
          router.push('/');
        }
      } catch (error) {
        if(axios.isAxiosError(error)){
          console.log("---->>",error?.response?.data)

          toast.error(error.response?.data.error || "An error occurred during sign-up." )
        }else{
          console.error("Unknown Error:", error);
          toast.error("An unexpected error occurred.");
        }
      }
    }
  };

  const validateInfo = (user: { email: string; password: string }) => {
    if (user.email === '') {
      setEmailError("Email shouldn't be empty");
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
      <div className="registerForm bg-white rounded shadow-md flex flex-col w-128 gap-7 p-5 pr-12" style={{ padding: '2.25rem', width: '34rem' }}>
        <h1 className="text-5xl font-bold text-left">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-7 pl-7">
          <div className="emailInput">
            <label htmlFor="email" className="block text-left mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`border p-2 rounded w-full ${emailError ? 'border-red-500' : 'border-gray-300'}`}
              ref={emailRef}
            />
            {emailError && <p className="text-red-500 text-left">{emailError}</p>}
          </div>
          <div className="passwordInput">
            <label htmlFor="password" className="block text-left mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`border p-2 rounded w-full ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
              ref={passwordRef}
            />
            {passwordError && <p className="text-red-500 text-left">{passwordError}</p>}
            <p className="text-left">
              <Link href="/forgotpassword" className="text-blue-400">
                Forgot Password?
              </Link>
            </p>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="text-white w-24 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mb-2"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-left">
          Dont have an account?{' '}
          <Link href="/signup" className="text-blue-400">
            Create
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
