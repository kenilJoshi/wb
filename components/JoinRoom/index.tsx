import { useRef } from "react";
import { useDispatch } from "react-redux";
import { joinRoom } from "@/store/slices/webSocketSlice";
// import { RootState } from "@/store/store";
/* eslint-disable @typescript-eslint/no-explicit-any */
interface JoinRoomType {
  show: any;
  onClose: any;
  socket: WebSocket | null;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
const JoinRoom = ({ show, onClose, socket }: JoinRoomType) => {
  const roomRef = useRef<HTMLInputElement>(null);
  // const {room} = useSelector((state: RootState) => state.webSocket)
  const dispatch = useDispatch()
  if (!show) return null;

  const joinTheRoom = () => {
    const roomId = parseInt(roomRef.current?.value || "0");
    console.log(JSON.stringify({type: "join", room: roomId}));
    
    socket?.send(JSON.stringify({type: "join", room: roomId}))
    dispatch(joinRoom({ room: roomId }));
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Join Room</h2>
        <div className="mb-4">
          <label
            htmlFor="roomId"
            className="block text-sm font-medium text-gray-700"
          >
            Room ID
          </label>
          <input
            type="text"
            id="roomId"
            ref={roomRef}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Room ID"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={joinTheRoom}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
          >
            Join
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
