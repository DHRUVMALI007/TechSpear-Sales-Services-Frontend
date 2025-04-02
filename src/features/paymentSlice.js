import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5000/api/v1/payment"


export const createPayment= createAsyncThunk("payment/create",async({userId,orderId,amount},{rejectWithValue})=>{
    try{
        console.log(userId,orderId,amount)
        const response = await axios.post(`${baseUrl}/createPayment`,{userId,orderId,amount},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log(response.data)
        return response.data

    }
    catch(er){
        return rejectWithValue(er?.response?.data?.message)
    }
}) 


export const verifyPayment= createAsyncThunk("payment/verify",async({razorpayOrderId, razorpayPaymentId, razorpaySignature},{rejectWithValue})=>{
    try{
        console.log(razorpayOrderId, razorpayPaymentId, razorpaySignature)
        const response = await axios.post(`${baseUrl}/verifyPayment`,{razorpayOrderId, razorpayPaymentId, razorpaySignature},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log(response.data)
        return response.data

    }
    catch(er){
        return rejectWithValue(er?.response?.data?.message)
    }
}) 


export const getAllPayment= createAsyncThunk("payment/getAll",async(_,{rejectWithValue})=>{
    try{
        const response = await axios.get(`${baseUrl}/getAllPayment`,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log(response.data)
        return response.data

    }
    catch(er){
        return rejectWithValue(er?.response?.data?.message)
    }
}) 

export const getUserPayment= createAsyncThunk("payment/user",async({userId},{rejectWithValue})=>{
    try{
        console.log(userId)
        const response = await axios.get(`${baseUrl}/userPayment/${userId}`,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log(response.data)
        return response.data;

    }
    catch(er){
        return rejectWithValue(er?.response?.data?.message)
    }
}) 


const paymentSlice = createSlice({
    name:"Payment",
    initialState:{
        loading:false,
        created:null,
        verified:null,
        payments:[],
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(createPayment.pending,(state,action)=>{
            state.loading=true;
            state.error =null;
            state.created=null;
        })
        builder.addCase(createPayment.fulfilled,(state,action)=>{
            state.loading=false;
            state.error =null;
            state.created=action.payload;
        })
        builder.addCase(createPayment.rejected,(state,action)=>{
            state.loading=false;
            state.error =action.payload;
            state.created=null;
        })


        builder.addCase(verifyPayment.pending,(state,action)=>{
            state.loading=true;
            state.error =null;
            state.verified=null;
        })
        builder.addCase(verifyPayment.fulfilled,(state,action)=>{
            state.loading=false;
            state.error =null;
            state.verified=action.payload;
        })
        builder.addCase(verifyPayment.rejected,(state,action)=>{
            state.loading=false;
            state.error =action.payload;
            state.verified=null;
        })


        builder.addCase(getAllPayment.pending,(state,action)=>{
            state.loading=true;
            state.error =null;
            state.payments=null;
        })
        builder.addCase(getAllPayment.fulfilled,(state,action)=>{
            state.loading=false;
            state.error =null;
            state.payments=action.payload;
        })
        builder.addCase(getAllPayment.rejected,(state,action)=>{
            state.loading=false;
            state.error =action.payload;
            state.payments=null;
        })


        builder.addCase(getUserPayment.pending,(state,action)=>{
            state.loading=true;
            state.error =null;
            state.payments=null;
        })
        builder.addCase(getUserPayment.fulfilled,(state,action)=>{
            state.loading=false;
            state.error =null;
            state.payments=action.payload;
        })
        builder.addCase(getUserPayment.rejected,(state,action)=>{
            state.loading=false;
            state.error =action.payload;
            state.payments=null;
        })


    }
})

export default paymentSlice.reducer;