"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";

interface Whiteboard {
  id?: string | number;
  name?: string;
}

export default function Dashboard() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [whiteboards, setWhiteboards] = useState<Whiteboard[]>([]); // Use Whiteboard type
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.authUser);

  const handleAdd = () => {
    setIsPopupOpen(true);
  };

  useEffect(() => {
    const fetchWhiteboards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3008/whiteBoard/get-all-whiteboard",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response.data.data);

        setWhiteboards(response.data.data); // Update state with API response
        console.log("Whiteboards fetched:", response.data.data);
      } catch (err) {
        console.error("Error fetching whiteboards:", err);
      }
    };

    fetchWhiteboards();
  }, [token]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setName("");
    setError("");
  };

  const handleConfirm = () => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    router.push(`/whiteBoard?name=${encodeURIComponent(name)}`);
  };

  const openWhiteBoard = (board: Whiteboard) => {
    router.push(`/whiteBoard?name=${board.name}&id=${board.id}`);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Your WhiteBoards</h1>

      <div className="flex gap-4">
        {/* Whiteboards List */}
        <div className="mb-5">
          {whiteboards.length > 0 ? (
            <ul className="space-y-2">
              {whiteboards.map((board: Whiteboard) => (
                <li
                  key={board.id}
                  onClick={() => openWhiteBoard(board)}
                  className="border p-4 rounded-md hover:shadow-md transition flex items-center justify-center text-center h-24 w-30 cursor-pointer"
                >
                  {board.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="h-24 flex items-center justify-center border p-4 rounded-md">
              No whiteboards available. Create one!
            </p>
          )}
        </div>

        {/* Add Button */}
        <button
          className="border-2 border-dotted border-gray-400 rounded-md text-gray-600 hover:border-gray-600 hover:text-black transition-colors flex items-center justify-center h-24 w-[7rem]"
          onClick={handleAdd}
        >
          + ADD
        </button>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Enter Whiteboard Name</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Whiteboard Name"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-black transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
