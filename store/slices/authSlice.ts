import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    email?: string;
    username?: string
}

interface UserAuth {
    user: User, 
    token: string
}

const initialState: UserAuth = {
    user: {
        email: "",
        username: ""
    },
    token: "",
}


const authUserSlice = createSlice({
    name: "authUserSlice",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserAuth>) => {
            console.log("Ken");
            console.log(action);
            
            state.user = action.payload.user
            state.token = action.payload.token
        },
        removeUser: (state, action: PayloadAction<UserAuth>) => {
            state.user = {
                email: "",
                username: ""
            }
            state.token = ""
        }
    }
})

export const {addUser, removeUser} = authUserSlice.actions

export default authUserSlice.reducer