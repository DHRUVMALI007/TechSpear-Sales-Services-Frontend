import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const registerUser= createAsyncThunk('user/register',async(formData,{rejectWithValue})=>{

    try{
        const response= await  axios.post("http://localhost:5000/api/v1/users/register", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          return response.data
    }
    catch(error){
        return rejectWithValue(error.response?.data || "Something went wrong"); 
    }
    
})

const userSlice= createSlice({
    name:"userKaAuth",
    initialState:{
        user:null,
        error:false,
        loading:false
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state,action)=>{
            state.loading=true;
            state.error=false;
        })
        builder.addCase(registerUser.fulfilled,(state,action)=>{
            state.user=action.payload;
            state.loading=false;
            state.error=false;
        })
        builder.addCase(registerUser.rejected,(state,action)=>{
              state.error=true
        })
    }
})

export default userSlice.reducer

