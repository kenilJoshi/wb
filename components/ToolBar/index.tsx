"use client";

import { useEffect, useState } from "react";
import { MuiColorInput } from 'mui-color-input'
import { useDispatch } from "react-redux";
import { styled } from 'styled-components'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { RootState } from "@/store/store";
import { addDrawParams, clearDrawParams } from "@/store/slices/drawWhiteboardSlice";

const MuiColorInputStyled = styled(MuiColorInput)`
  & .MuiOutlinedInput-input {
    color: white;
  }
`

const ToolBar = () => {
    const [color, setColor] = useState<string>("rgb(0, 0, 0)")
    const [lineWidth, setLineWidth] = useState(5)
    const dispatch = useDispatch()
    // const {drawParams, clearParams} = useSelector((state: RootState) => state.drawWhiteBoard)
    
    useEffect(() => {
        dispatch(addDrawParams({color: color, lineWidth: lineWidth}))
    }, [])
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const handleColorChange = (e: any) => {
        /* eslint-enable @typescript-eslint/no-explicit-any */
        dispatch(addDrawParams({color: e, lineWidth: lineWidth}))
        setColor(e)
    }
    console.log("dkdkdk");
    
/* eslint-disable @typescript-eslint/no-explicit-any */
    const linewidthHandle = (e: any) => {
        /* eslint-enable @typescript-eslint/no-explicit-any */
        dispatch(addDrawParams({color: color, lineWidth: e.target.value}))
        setLineWidth(e.target.value)
    }

    const clearHandle = () => {
        dispatch(clearDrawParams({clear: true}))
    }




    return (
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-44 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <h1 className='text-white'>ToolBar</h1>

                <div className='flex flex-col gap-y-6 mt-14'>
                    {/* <h1 className=''>Select Color</h1> */}
                    <MuiColorInputStyled sx={[
                        {
                            "& label.Mui-focused": {
                                color: "white       "
                              },
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                  borderColor: "white"
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                  },
                              }
                        },
                        {
                        label: {
                            color: "#ffffff", 
                        },
                        fieldset: { borderColor: "white" }
                       }
                    ]} size="small" label="Select Color" value={color} onChange={handleColorChange} />

                    <TextField
                        sx={[
                            {
                                "& label.Mui-focused": {
                                    color: "white       "
                                  },
                                "& .MuiOutlinedInput-root": {
                                    "&.Mui-focused fieldset": {
                                      borderColor: "white"
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                      },
                                  }
                            },
                            {
                            label: {
                                color: "#ffffff", 
                            },
                            input: {
                                color: "#ffffff",
                                },
                            fieldset: 
                            { 
                                borderColor: "white", 
                                color: "white" 
                            }
                        }
                        ]}
                        id="outlined-required"
                        label="Line Width"
                        type="number"
                        InputProps={{ inputProps: { max: 10, min: 1 } }}
                        defaultValue={lineWidth}
                        onChange={linewidthHandle}
                    />
                    <Button size='small' variant="contained" onClick={clearHandle}>Clear</Button>
                </div>
            </div>
        </aside>
    )
}


export default ToolBar