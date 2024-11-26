"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useDispatch } from "react-redux";
import { addUser } from "@/store/slices/authSlice";
// import { RootState } from "@/store/store";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deepOrange } from "@mui/material/colors";
/* eslint-disable @typescript-eslint/no-explicit-any */
interface DecodedToken extends JwtPayload {
  name?: string;
  email?: string;
  exp?: any;
  iat?: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState<DecodedToken>({});
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll position
  const dispatch = useDispatch();
  // const { user, token } = useSelector((state: RootState) => state.authUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const userToken = Cookies.get("token");

    if (userToken) {
      console.log("JWT Token:", userToken);

      try {
        const decoded = jwtDecode<DecodedToken>(userToken);
        dispatch(
          addUser({
            user: {
              username: decoded.name,
              email: decoded.email,
            },
            token: userToken,
          })
        );
        setUserDetails(decoded);
        console.log("Decoded Token:", decoded);
      } catch (error) {
        console.error("Invalid Token:", error);
      }

      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    setIsAuthenticated(false);
    setUserDetails({}); // Clear user details on logout
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav
      className={`bg-white sticky top-0 z-50 p-5 transition-shadow duration-300 ${
        isScrolled ? "shadow" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-gray-500 text-xl font-bold">
          <Link href="/">MyWebsite</Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-7 flex items-center">

          {isAuthenticated ? (
            <>
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                }}
                onClick={handleAvatarClick}
              >
                {userDetails?.name?.charAt(0).toUpperCase() || "U"}
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem>
                  <Link href="/Dashboard">
                    <span className="no-underline text-black">Dashboard</span>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="text-gray-500 hover:text-blue-500"
              >
                Sign Up
              </Link>
              <Link
                href="/signin"
                className="text-gray-500 bg-white border border-blue-500 rounded-full px-4 py-2 transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
