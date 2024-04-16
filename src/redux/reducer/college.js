import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

//  calling api 
export const getcollegedetails=createAsyncThunk("college/getcollegedetails",async(payload)=>{
    try {
        // console.log(payload)
        const response=  await fetch (`https://my-json-server.typicode.com/rachit3014/College/college?_limit=10&_page=${payload}`)
        const data= await response.json()
        console.log(data)
        return data
        
    } catch (error) {
        console.log(error)
        
    }

})

//  created initalstate 
const initialState={
    college:[]
}
// Creating Reducer using Redux Toolkit
const collegeSlice= createSlice({
    name:"college",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getcollegedetails.fulfilled,(state,action)=>{
            // console.log(action)
            state.college=[...state.college,...action.payload]
        })
    }
})

export const Collegereducer=collegeSlice.reducer
//  action for collegeSlice
export const action=collegeSlice.actions;

export const Collegeselector=(state)=>state.Collegereducer.college