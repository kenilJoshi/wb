"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const [emailError, setEmailError] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = emailRef.current?.value || '';

        if (validate(email)) {
            try {
                const response = await axios.put('http://localhost:3008/user/forgotPassword', { email });
                console.log(response);
                router.push('/changepassword');
            } catch (error) {
                console.error("Error sending email:", error);
            }
        }
    };

    const validate = (email: string): boolean => {
        if (email === '') {
            setEmailError('Email should not be empty');
            return false;
        } else {
            setEmailError('');
        }
        return true;
    };

    return (
        <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
            <div className="registerForm bg-white rounded shadow-md text-center flex flex-col w-128 gap-7 p-5 pr-12"style={{ padding: '2.25rem', width: '34rem' }}>
                <h1 className='text-5xl font-bold text-left'>Forgot Password</h1>
                <p className='text-left'>Reset password email will be sent</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-7 pl-7'>
                    <div className='emailInput'>
                        <input
                            type="email"
                            placeholder="Email"
                            className={`w-full border p-2 rounded ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                            ref={emailRef}
                        />
                        {emailError && <p className="text-red-500 text-left">{emailError}</p>}
                    </div>
                    <div className='text-right'>
                        <input
                            type="submit"
                            value="Send Email"
                            className="text-white w-28 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
