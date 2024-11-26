import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { disconnect } from "process";

interface Room {
    room: number | any
}

interface WebsocketState{
    message: string[];
    isConnected: boolean;
    room: Room
}

const initialState: WebsocketState = {
    message: [],
    isConnected: false,
    room: {
        room: 0
    }
}

const WebSocketSlice = createSlice({
    name: "webSocket",
    initialState,
    reducers: {
        disconnected: (state) => {
            state.isConnected = false;
            // state.socket = null;
        },
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload
        },
        addMessage: (state, action: PayloadAction<string[]>) => {
            state.message = action.payload
        },
        joinRoom: (state, action: PayloadAction<Room>) => {
            state.room.room = action.payload
        }
    }
})

export const { disconnected, setConnected, addMessage, joinRoom} = WebSocketSlice.actions
export default WebSocketSlice.reducer