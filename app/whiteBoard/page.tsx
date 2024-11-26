// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import { useRouter } from "next/navigation";
// import {
//   disconnected,
//   setConnected,
// } from "@/store/slices/webSocketSlice";
// import ToolBar from "@/components/ToolBar";
// import Link from "next/link";
// import JoinRoom from "@/components/JoinRoom";
// import CanvasPad from "@/components/CanvasPad";
// import { jwtDecode, JwtPayload } from "jwt-decode";
// import { addUser } from "@/store/slices/authSlice";
// // import Link from "next/link";
// import Cookies from "js-cookie";
// import Avatar from "@mui/material/Avatar";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { deepOrange } from "@mui/material/colors";
// import SaveAltIcon from "@mui/icons-material/SaveAlt";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// interface DecodedToken extends JwtPayload {
//   name?: string;
//   email?: string;
//   exp?: any;
//   iat?: any;
// }

// const WhiteBoard = () => {
//   const dispatch = useDispatch();
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [socketObj, setSocketObj] = useState<WebSocket | null>(null);
//   const [showPopup, setShowPopup] = useState<boolean>(false);
//   const [canvasWidth, setCanvasWidth] = useState<number>(0);
//   const [canvasHeight, setCanvasHeight] = useState<number>(0);
//   const { token } = useSelector((state: RootState) => state.authUser);
//   const [username, setUserName] = useState<string>("");
//   const [whiteBoardId1, setWhiteBoardId] = useState<Number>(0);
//   const router = useRouter();
//   // State for avatar menu
//   const searchParams = useSearchParams();
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   useEffect(() => {
//     const handleResize = () => {
//       setCanvasWidth(window.innerWidth);
//       setCanvasHeight(window.innerHeight);
//     };

//     // Set initial values
//     handleResize();

//     const userToken = Cookies.get("token");

//     if (userToken) {
//       console.log("JWT Token:", userToken);

//       try {
//         const decoded = jwtDecode<DecodedToken>(userToken);
//         dispatch(
//           addUser({
//             user: {
//               username: decoded.name,
//               email: decoded.email,
//             },
//             token: userToken,
//           })
//         );
//         setUserName(decoded.name || "");
//         console.log("Decoded Token:", decoded);
//       } catch (error) {
//         console.error("Invalid Token:", error);
//       }
//     }

//     // Update on resize
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // const { message, isConnected } = useSelector(
//   //   (state: RootState) => state.webSocket
//   // );

//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:8000/");

//     // const params = searchParams.get("id");
//     // if (params !== null) {
//       // const getTheWhiteBoard = await axios.post(
//       //   "localhost:3008/whiteBoard/get-one-whiteboard",
//       //   {
//       //     whiteBoardId: params,
//       //   },
//       //   {
//       //     headers: {
//       //       Authorization: token,
//       //     },
//       //   }
//       // );
//     // }
//     console.log(whiteBoardId1);
    
//     socket.onopen = () => {
//       dispatch(setConnected(true));
//       setSocketObj(socket);
//       console.log("WebSocket Connected");
//     };

//     return () => {
//       socket.onclose = () => {
//         dispatch(setConnected(false));
//         console.log("WebSocket Disconnected");
//       };
//       dispatch(disconnected());
//     };
//   }, []);

//   // Handle avatar menu
//   const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     Cookies.remove("token");
//     dispatch(
//       addUser({
//         user: {
//           username: "",
//           email: "",
//         },
//         token: "",
//       })
//     );
//     setUserName("");
//     handleClose();
//     router.push("/signin");
//   };

//   const saveWhiteboard = async () => {
//     if (canvasRef.current) {
//       const canvas = canvasRef.current;
//       const dataURL = canvas.toDataURL("image/png");
//       const params = searchParams.get("name");
//       // console.log(whiteBoardId);

//       if (searchParams.get("id") == null) {
//         try {
//           const saveImageData = await axios.post(
//             "http://localhost:3008/whiteBoard/save-whiteboard",
//             {
//               name: params,
//               imageData: dataURL,
//             },
//             {
//               headers: {
//                 Authorization: token,
//               },
//             }
//           );

//           if (saveImageData) {
//             setWhiteBoardId(saveImageData.data.data.id);
//             toast.success("Saved The WhiteBoard");
//           }
//         } catch (e) {
//           console.log(e);
//           toast.error("Something went wrong");
//         }
//       } else {
//         try {
//           const saveImageData = await axios.post(
//             "http://localhost:3008/whiteBoard/save-whiteboard",
//             {
//               name: params,
//               whiteBoardId: searchParams.get("id"),
//               imageData: dataURL,
//             },
//             {
//               headers: {
//                 Authorization: token,
//               },
//             }
//           );

//           if (saveImageData) {
//             toast.success("Saved The WhiteBoard");
//           }
//         } catch (e) {
//           console.log(e);
//           toast.error("Something went wrong");
//         }
//       }
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <ToolBar />
//       <div className="fixed left-[85rem] z-30 bg-white shadow-md rounded flex gap-2 p-3 items-center">
//         <button onClick={() => setShowPopup(true)}>Join Room</button>
//         <button
//           className="px-2 py-2 flex items-center gap-2"
//           onClick={saveWhiteboard}
//         >
//           <SaveAltIcon sx={{ fontSize: 20 }} />
//           Save
//         </button>
//         <JoinRoom
//           show={showPopup}
//           onClose={() => setShowPopup(false)}
//           socket={socketObj}
//         />
//         {username && (
//           <>
//             <Avatar
//               sx={{
//                 bgcolor: deepOrange[500],
//                 width: 30,
//                 height: 30,
//                 cursor: "pointer",
//               }}
//               onClick={handleAvatarClick}
//             >
//               {username.charAt(0).toUpperCase()}
//             </Avatar>
//             <Menu
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleClose}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "right",
//               }}
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//             >
//               <MenuItem>
//                 <Link href="/Dashboard">
//                   <span className="no-underline text-black">DashBoard</span>
//                 </Link>
//               </MenuItem>
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </Menu>
//           </>
//         )}
//       </div>
//       <CanvasPad
//         ref={canvasRef}
//         canvasWidth={canvasWidth}
//         canvasHeight={canvasHeight}
//         whiteBoardId={searchParams.get("id")}
//         socket={socketObj}
//       />
//       {/* <ToastContainer position="top-right" autoClose={3000} /> */}
//     </div>
//   );
// };

// export default WhiteBoard;


// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import { useRouter } from "next/navigation";
// import { disconnected, setConnected } from "@/store/slices/webSocketSlice";
// import ToolBar from "@/components/ToolBar";
// import Link from "next/link";
// import JoinRoom from "@/components/JoinRoom";
// import CanvasPad from "@/components/CanvasPad";
// import { jwtDecode, JwtPayload } from "jwt-decode";
// import { addUser } from "@/store/slices/authSlice";
// import Cookies from "js-cookie";
// import Avatar from "@mui/material/Avatar";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { deepOrange } from "@mui/material/colors";
// import SaveAltIcon from "@mui/icons-material/SaveAlt";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// interface DecodedToken extends JwtPayload {
//   name?: string;
//   email?: string;
//   exp?: number;
//   iat?: number;
// }

// const WhiteBoard = () => {
//   const dispatch = useDispatch();
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [socketObj, setSocketObj] = useState<WebSocket | null>(null);
//   const [showPopup, setShowPopup] = useState<boolean>(false);
//   const [canvasWidth, setCanvasWidth] = useState<number>(0);
//   const [canvasHeight, setCanvasHeight] = useState<number>(0);
//   const { token } = useSelector((state: RootState) => state.authUser);
//   const [username, setUserName] = useState<string>("");
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   useEffect(() => {
//     const handleResize = () => {
//       setCanvasWidth(window.innerWidth);
//       setCanvasHeight(window.innerHeight);
//     };

//     handleResize();

//     const userToken = Cookies.get("token");

//     if (userToken) {
//       console.log("JWT Token:", userToken);

//       try {
//         const decoded = jwtDecode<DecodedToken>(userToken);
//         dispatch(
//           addUser({
//             user: {
//               username: decoded.name,
//               email: decoded.email,
//             },
//             token: userToken,
//           })
//         );
//         setUserName(decoded.name || "");
//         console.log("Decoded Token:", decoded);
//       } catch (error) {
//         console.error("Invalid Token:", error);
//       }
//     }

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [dispatch]);

//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:8000/");

//     console.log(searchParams.get("id"));

//     socket.onopen = () => {
//       dispatch(setConnected(true));
//       setSocketObj(socket);
//       console.log("WebSocket Connected");
//     };

//     return () => {
//       socket.onclose = () => {
//         dispatch(setConnected(false));
//         console.log("WebSocket Disconnected");
//       };
//       dispatch(disconnected());
//     };
//   }, [dispatch]);

//   const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     Cookies.remove("token");
//     dispatch(
//       addUser({
//         user: {
//           username: "",
//           email: "",
//         },
//         token: "",
//       })
//     );
//     setUserName("");
//     handleClose();
//     router.push("/signin");
//   };

//   const saveWhiteboard = async () => {
//     if (canvasRef.current) {
//       const canvas = canvasRef.current;
//       const dataURL = canvas.toDataURL("image/png");
//       const params = searchParams.get("name");

//       if (searchParams.get("id") == null) {
//         try {
//           const saveImageData = await axios.post(
//             "http://localhost:3008/whiteBoard/save-whiteboard",
//             {
//               name: params,
//               imageData: dataURL,
//             },
//             {
//               headers: {
//                 Authorization: token,
//               },
//             }
//           );

//           if (saveImageData) {
//             toast.success("Saved The WhiteBoard");
//           }
//         } catch (e) {
//           console.log(e);
//           toast.error("Something went wrong");
//         }
//       } else {
//         try {
//           const saveImageData = await axios.post(
//             "http://localhost:3008/whiteBoard/save-whiteboard",
//             {
//               name: params,
//               whiteBoardId: searchParams.get("id"),
//               imageData: dataURL,
//             },
//             {
//               headers: {
//                 Authorization: token,
//               },
//             }
//           );

//           if (saveImageData) {
//             toast.success("Saved The WhiteBoard");
//           }
//         } catch (e) {
//           console.log(e);
//           toast.error("Something went wrong");
//         }
//       }
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <ToolBar />
//       <div className="fixed left-[85rem] z-30 bg-white shadow-md rounded flex gap-2 p-3 items-center">
//         <button onClick={() => setShowPopup(true)}>Join Room</button>
//         <button
//           className="px-2 py-2 flex items-center gap-2"
//           onClick={saveWhiteboard}
//         >
//           <SaveAltIcon sx={{ fontSize: 20 }} />
//           Save
//         </button>
//         <JoinRoom
//           show={showPopup}
//           onClose={() => setShowPopup(false)}
//           socket={socketObj}
//         />
//         {username && (
//           <>
//             <Avatar
//               sx={{
//                 bgcolor: deepOrange[500],
//                 width: 30,
//                 height: 30,
//                 cursor: "pointer",
//               }}
//               onClick={handleAvatarClick}
//             >
//               {username.charAt(0).toUpperCase()}
//             </Avatar>
//             <Menu
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleClose}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "right",
//               }}
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//             >
//               <MenuItem>
//                 <Link href="/Dashboard">
//                   <span className="no-underline text-black">DashBoard</span>
//                 </Link>
//               </MenuItem>
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </Menu>
//           </>
//         )}
//       </div>
//       <CanvasPad
//         ref={canvasRef}
//         canvasWidth={canvasWidth}
//         canvasHeight={canvasHeight}
//         whiteBoardId={searchParams.get("id")}
//         socket={socketObj}
//       />
//       {/* <ToastContainer position="top-right" autoClose={3000} /> */}
//     </div>
//   );
// };

// export default WhiteBoard;


"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { disconnected, setConnected } from "@/store/slices/webSocketSlice";
import ToolBar from "@/components/ToolBar";
import Link from "next/link";
import JoinRoom from "@/components/JoinRoom";
import CanvasPad from "@/components/CanvasPad";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { addUser } from "@/store/slices/authSlice";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deepOrange } from "@mui/material/colors";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DecodedToken extends JwtPayload {
  name?: string;
  email?: string;
  exp?: number;
  iat?: number;
}

export default function WhiteBoard() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Page />
    </Suspense>
  );
}

const Page = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [socketObj, setSocketObj] = useState<WebSocket | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const { token } = useSelector((state: RootState) => state.authUser);
  const [username, setUserName] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleResize = () => {
      setCanvasWidth(window.innerWidth);
      setCanvasHeight(window.innerHeight);
    };

    handleResize();

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
        setUserName(decoded.name || "");
        console.log("Decoded Token:", decoded);
      } catch (error) {
        console.error("Invalid Token:", error);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/");

    console.log(searchParams.get("id"));

    socket.onopen = () => {
      dispatch(setConnected(true));
      setSocketObj(socket);
      console.log("WebSocket Connected");
    };

    return () => {
      socket.onclose = () => {
        dispatch(setConnected(false));
        console.log("WebSocket Disconnected");
      };
      dispatch(disconnected());
    };
  }, [dispatch]);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(
      addUser({
        user: {
          username: "",
          email: "",
        },
        token: "",
      })
    );
    setUserName("");
    handleClose();
    router.push("/signin");
  };

  const saveWhiteboard = async () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL("image/png");
      const params = searchParams.get("name");

      if (searchParams.get("id") == null) {
        try {
          const saveImageData = await axios.post(
            "http://localhost:3008/whiteBoard/save-whiteboard",
            {
              name: params,
              imageData: dataURL,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );

          if (saveImageData) {
            toast.success("Saved The WhiteBoard");
          }
        } catch (e) {
          console.log(e);
          toast.error("Something went wrong");
        }
      } else {
        try {
          const saveImageData = await axios.post(
            "http://localhost:3008/whiteBoard/save-whiteboard",
            {
              name: params,
              whiteBoardId: searchParams.get("id"),
              imageData: dataURL,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );

          if (saveImageData) {
            toast.success("Saved The WhiteBoard");
          }
        } catch (e) {
          console.log(e);
          toast.error("Something went wrong");
        }
      }
    }
  };

  return (
    // <Suspense>
    <div className="flex h-screen">
      <ToolBar />
      <div className="fixed left-[85rem] z-30 bg-white shadow-md rounded flex gap-2 p-3 items-center">
        <button onClick={() => setShowPopup(true)}>Join Room</button>
        <button
          className="px-2 py-2 flex items-center gap-2"
          onClick={saveWhiteboard}
        >
          <SaveAltIcon sx={{ fontSize: 20 }} />
          Save
        </button>
        <JoinRoom
          show={showPopup}
          onClose={() => setShowPopup(false)}
          socket={socketObj}
        />
        {username && (
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
              {username.charAt(0).toUpperCase()}
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
                  <span className="no-underline text-black">DashBoard</span>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </div>
        <CanvasPad
          ref={canvasRef}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          whiteBoardId={searchParams.get("id")}
          socket={socketObj}
        />
      {/* </Suspense> */}
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </div>
    // </Suspense>
  );
};

// export default WhiteBoard;

