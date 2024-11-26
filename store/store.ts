import { configureStore } from "@reduxjs/toolkit";
import webSocketReducer from "./slices/webSocketSlice" 
import drawWhiteBoardReducer from "./slices/drawWhiteboardSlice"
import authUserSlice from "../store/slices/authSlice"

export const store = configureStore({
    reducer: {
        webSocket: webSocketReducer,
        drawWhiteBoard: drawWhiteBoardReducer,
        authUser: authUserSlice
    }
}) 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;