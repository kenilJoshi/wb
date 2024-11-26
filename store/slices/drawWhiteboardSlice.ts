import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface DrawParams {
    color: string;
    lineWidth: number
}

interface ClearParams { 
    clear: boolean
}

interface DrawWhiteBoard {
    drawParams: DrawParams
    clearParams: ClearParams
}

const initialState: DrawWhiteBoard = {
    drawParams: {
        color: "",
        lineWidth: 0
    },
    clearParams: {
        clear: false
    }
}

const DrawWhiteBoardSlice = createSlice({
    name: "drawWhiteBoard",
    initialState,
    reducers: {
        addDrawParams: (state, action: PayloadAction<DrawParams>) => {
            state.drawParams.color = action.payload.color
            state.drawParams.lineWidth = action.payload.lineWidth
        },
        clearDrawParams: (state, action: PayloadAction<ClearParams>) => {
            console.log(action);
            
            state.clearParams.clear = action.payload.clear
        }
    }
})

export const {addDrawParams, clearDrawParams} = DrawWhiteBoardSlice.actions

export default DrawWhiteBoardSlice.reducer