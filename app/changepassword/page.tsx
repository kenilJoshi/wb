"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ChangePassword: React.FC = () => {
  const otpRef = useRef<HTMLInputElement>(null);
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null); // New email reference
  const [otpError, setOtpError] = useState<string>("");
  const [oldPasswordError, setOldPasswordError] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>(""); // New email error state
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    otpRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const otp = otpRef.current?.value || "";
    const oldPassword = oldPasswordRef.current?.value || "";
    const newPassword = newPasswordRef.current?.value || "";
    const email = emailRef.current?.value || ""; // Get the email value

    if (validate(otp, oldPassword, newPassword, email)) {
      try {
        const response = await axios.put(
          "http://localhost:3008/user/changePassword",
          { otp, oldPassword, newPassword, email } // Include email in the request
        );
        if (response) {
          router.push("/signin");
        }
      } catch (error) {
        console.error("Error changing password:", error);
      }
    }
  };

  const validate = (otp: string, oldPassword: string, newPassword: string, email: string): boolean => {
    let isValid = true;

    if (otp === "") {
      setOtpError("OTP should not be empty");
      isValid = false;
    } else {
      setOtpError("");
    }

    if (oldPassword === "") {
      setOldPasswordError("Old password should not be empty");
      isValid = false;
    } else {
      setOldPasswordError("");
    }

    if (newPassword === "") {
      setNewPasswordError("New password should not be empty");
      isValid = false;
    } else {
      setNewPasswordError("");
    }

    if (email === "") {
      setEmailError("Email should not be empty"); // Validate email
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div
        className="registerForm bg-white rounded shadow-md text-center flex flex-col w-128 gap-7 p-5 pr-12"
        style={{ padding: "2.25rem", width: "34rem" }}
      >
        <h1 className="text-5xl font-bold text-left">Change Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-7 pl-7">
        <div className="emailInput">
            <input
              type="email"
              placeholder="Email"
              className={`w-full border p-2 rounded ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              ref={emailRef}
            />
            {emailError && <p className="text-red-500 text-left">{emailError}</p>}
          </div>
          <div className="otpInput">
            <input
              type="text"
              placeholder="OTP"
              className={`w-full border p-2 rounded ${
                otpError ? "border-red-500" : "border-gray-300"
              }`}
              ref={otpRef}
            />
            {otpError && <p className="text-red-500 text-left">{otpError}</p>}
          </div>
          <div className="oldPasswordInput">
            <input
              type="password"
              placeholder="Old Password"
              className={`w-full border p-2 rounded ${
                oldPasswordError ? "border-red-500" : "border-gray-300"
              }`}
              ref={oldPasswordRef}
            />
            {oldPasswordError && <p className="text-red-500 text-left">{oldPasswordError}</p>}
          </div>
          <div className="newPasswordInput">
            <input
              type="password"
              placeholder="New Password"
              className={`w-full border p-2 rounded ${
                newPasswordError ? "border-red-500" : "border-gray-300"
              }`}
              ref={newPasswordRef}
            />
            {newPasswordError && <p className="text-red-500 text-left">{newPasswordError}</p>}
          </div>
          <div className="text-right">
            <input
              type="submit"
              value="Change Password"
              className="text-white w-36 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-lg text-sm px-5 py-3 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
