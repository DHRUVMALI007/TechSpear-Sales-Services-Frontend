import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const registerUser = createAsyncThunk(
    "user/register",
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/users/register",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Registration Error:", error.response?.data || error);
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
    }
  );
  

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
      loading: false,
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          console.log("User Registered Successfully:", action.payload);
          state.user = action.payload; 
          state.loading = false;
          state.error = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
        //   console.error("Register Error:", action.payload);
          state.loading = false;
          state.error = action.payload;
        });
  
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.user = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.user = null;
        });
    },
  });
  
  export default userSlice.reducer;
  
