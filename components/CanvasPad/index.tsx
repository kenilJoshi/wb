// 'use client'; // Ensure this file is treated as a client component

// import React, { useEffect, useRef, useState, MouseEvent, forwardRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { clearDrawParams } from '../../store/slices/drawWhiteboardSlice';
// import { RootState } from '../../store/store'; // Assuming you have a RootState type for Redux store
// // import { Socket } from 'socket.io-client';

// interface CanvasPadProps {
//   canvasWidth: number;
//   canvasHeight: number;
//   socket: WebSocket | null;
// }

// const CanvasPad: React.FC<CanvasPadProps> = forwardRef(({ canvasWidth, canvasHeight, socket }, ref) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const { color, lineWidth } = useSelector((state: RootState) => state.drawWhiteBoard.drawParams);
//   const { clear } = useSelector((state: RootState) => state.drawWhiteBoard.clearParams);
//   const { room } = useSelector((state: RootState) => state?.webSocket.room);
//   const [isPainting, setIsPainting] = useState<boolean>(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;
    
//     // socket?.send(JSON.stringify({type: "message", room: 1, linewidth: 4, x: 10, y: 20, color: "sdd", clear: false}))
//     // if (socket) {
//     //   socket.onmessage = (event) => {
//     //     console.log("Message received:", event.data);
//     //   };
//     // }

//     if (clear) {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//     //   socket.emit('send_message', { clear: true, room });
//       dispatch(clearDrawParams({ clear: false }));
//     }
//   }, [clear, dispatch, socket]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     if(socket){
//       socket.onmessage = (event) => {
//         console.log(event.data);
        
//         let data = JSON.parse(event.data)
//         if(data.clear){
//           ctx.clearRect(0, 0, canvas.width, canvas.height);
//         }
//         if(data.isPainting){
//           ctx.strokeStyle = data.color;
//           ctx.lineWidth = data.lineWidth;
//           ctx.lineCap = 'round';
//           ctx.lineTo(data.x - canvas.offsetLeft, data.y);
//           ctx.stroke();
//         }else {
//           console.log("Kenil");
          
//           ctx.stroke();
//           ctx.beginPath();
//         }
//       }

//     }

//     return () => {
//     //   socket.off('receive_message'); // Clean up the socket listener
//     };
//   }, [socket]);

//   const move = (e: MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (!canvas || !isPainting) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     ctx.strokeStyle = color;
//     ctx.lineWidth = lineWidth;
//     ctx.lineCap = 'round';

//     // socket.emit('send_message', {
//     //   lineWidth,
//     //   x: e.clientX,
//     //   y: e.clientY,
//     //   color,
//     //   isPainting,
//     //   clear: false,
//     //   room,
//     // });

//     socket?.send(JSON.stringify({
//       type: "message",
//       lineWidth,
//       x: e.clientX,
//       y: e.clientY,
//       color,
//       isPainting,
//       clear: false,
//       room,
//     }))

//     ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY);
//     ctx.stroke();
//   };

//   const down = () => {
//     setIsPainting(true);
//   };

//   const up = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     setIsPainting(false);
//     // socket.emit('send_message', { isPainting: false, room });
//     socket?.send(JSON.stringify({isPainting: false, room, type: "NOT_PAINTING"}))
//     ctx.stroke();
//     ctx.beginPath();
//   };

//   return (
//     <div>
//       <canvas
//         ref={canvasRef}
//         width={canvasWidth}
//         height={canvasHeight}
//         onMouseDown={down}
//         onMouseUp={up}
//         onMouseMove={move}
//       />
//     </div>
//   );
// });

// export default CanvasPad;


"use client";
//@ts-nocheck
import React, { useEffect, useRef, useState, MouseEvent, forwardRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearDrawParams } from '../../store/slices/drawWhiteboardSlice';
import { RootState } from '../../store/store';
import axios from 'axios';

interface CanvasPadProps {
  canvasWidth: number;
  canvasHeight: number;
  socket: WebSocket | null;
  whiteBoardId: string | number;
}

const CanvasPad = forwardRef<HTMLCanvasElement, CanvasPadProps>(
  ({ canvasWidth, canvasHeight, socket, whiteBoardId }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { color, lineWidth } = useSelector((state: RootState) => state.drawWhiteBoard.drawParams);
    const { token } = useSelector((state: RootState) => state.authUser);
    const { clear } = useSelector((state: RootState) => state.drawWhiteBoard.clearParams);
    const { room } = useSelector((state: RootState) => state?.webSocket.room);
    const [isPainting, setIsPainting] = useState<boolean>(false);
    const [imageData, setImageData] = useState<ImageData | null>(null);
    const dispatch = useDispatch();

    useImperativeHandle(ref, () => canvasRef.current);

    useEffect(() => {
      // Fetch the whiteboard image data on mount
      if (whiteBoardId !== null && token !== "") {
        const getWhiteboard = async () => {
          try {
            const response = await axios.post(
              "http://localhost:3008/whiteBoard/get-one-whiteboard",
              {
                whiteBoardId: whiteBoardId,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            console.log(response);
            
            // Assuming the response contains image data (base64 or ImageData)
            const fetchedImageData = response.data.data.imageData; // This could be base64 or an ImageData object
            if (fetchedImageData) {
              setImageData(fetchedImageData); // Set image data to state
            }
          } catch (error) {
            console.error('Error fetching whiteboard data:', error);
          }
        };

        getWhiteboard();
      }
    }, [whiteBoardId, token]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas when 'clear' is triggered
      if (clear) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dispatch(clearDrawParams({ clear: false }));
      }

      // If imageData is available, draw it on the canvas
      if (imageData) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const img: any = new Image();
        /* eslint-enable @typescript-eslint/no-explicit-any */

        img.onload = () => {
          // Draw the fetched image data onto the canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = imageData; // Set imageData as the source
      }
    }, [clear, dispatch, socket, imageData]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (socket) {
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.clear) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
          if (data.isPainting) {
            ctx.strokeStyle = data.color;
            ctx.lineWidth = data.lineWidth;
            ctx.lineCap = 'round';
            ctx.lineTo(data.x - canvas.offsetLeft, data.y);
            ctx.stroke();
          } else {
            ctx.stroke();
            ctx.beginPath();
          }
        };
      }
    }, [socket]);

    const move = (e: MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas || !isPainting) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';

      socket?.send(
        JSON.stringify({
          lineWidth,
          x: e.clientX,
          y: e.clientY,
          color,
          isPainting,
          clear: false,
          room,
        })
      );

      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY);
      ctx.stroke();
    };

    const down = () => {
      setIsPainting(true);
    };

    const up = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      setIsPainting(false);
      socket?.send(JSON.stringify({ isPainting: false, room, type: 'NOT_PAINTING' }));
      ctx.stroke();
      ctx.beginPath();
    };

    return (
      <div>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          onMouseDown={down}
          onMouseUp={up}
          onMouseMove={move}
        />
      </div>
    );
  }
);

CanvasPad.displayName = 'CanvasPad';

export default CanvasPad;
