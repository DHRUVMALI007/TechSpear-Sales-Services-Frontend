import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const registerUser = createAsyncThunk('user/register', async (formData, { rejectWithValue }) => {

    try {
        const response = await axios.post("http://localhost:5000/api/v1/users/register", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data
    }
    catch (error) {
        return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }

})


export const loginUser= createAsyncThunk('user/login',async (data,{rejectWithValue}) =>{

    try{

        const response = await axios.post("http://localhost:5000/api/v1/users/login",data,{withCredentials:true})

        return response.data

    }
    catch(er){
        return rejectWithValue(er.response?.data?.message)
    }

})

const userSlice = createSlice({
    name: "userKaAuth",
    initialState: {
        user: null,
        error: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            console.log(action.payload)
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(loginUser.pending,(state,action)=>{
            state.loading=true;
            state.error=null;
            state.user=null;
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.error=null;
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
            state.user=null
            
        })
    }
})

export default userSlice.reducer

