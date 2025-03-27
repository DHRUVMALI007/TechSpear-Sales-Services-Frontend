import {createSlice ,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

export const addToCart= createAsyncThunk("cart/addToCart",async (productId)=>{
    try{
        const response = await axios.post(`http://localhost:5000/api/v1/cart/addToCart`,productId,{withCredentials:true,headers:{
            "Content-Type":"application/json"
        }})

        return response.data;
    }catch(er){
        return er
    }
})

export const getCart = createAsyncThunk("cart/getCart",async (productId)=>{
    try{
        const response = await axios.get(`http://localhost:5000/api/v1/cart/getCartItems/${productId}`,{withCredentials:true,headers:{
            "Content-Type":"application/json"
        }})

        return response.data;
    }catch(er){
        return er
    }
}) 

export const updateCartQuntity = createAsyncThunk("cart/updateCartQuntity",async ({productId,quantity})=>{
    try{
        const response = await axios.post(`http://localhost:5000/api/v1/cart/updateQuntity`,{productId,quantity},{withCredentials:true,headers:{
            "Content-Type":"application/json"
        }})

        return response.data;
    }catch(er){
        return er
    }
})

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cartItems:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{

        builder.addCase(addToCart.pending,(state)=>{
            state.loading=true;
            state.cartItems=[];
            state.error=null;
        })

        builder.addCase(addToCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cartItems=action.payload;
            state.error=null;
        })

        builder.addCase(addToCart.rejected,(state,action)=>{
            state.loading=false;
            state.cartItems=[];
            state.error=action.payload;
        })

    }
})

export default cartSlice.reducer;