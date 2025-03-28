import {createSlice ,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";

export const addToCartProduct= createAsyncThunk("cart/addToCart",async ({userId,productId,quantity})=>{
    try{
        const response = await axios.post(`http://localhost:5000/api/v1/cart/addToCart`,{userId,productId,quantity},{withCredentials:true,headers:{
            "Content-Type":"application/json"
        }})
        console.log("Sending Request with:", { userId, productId ,quantity});

        console.log(response)
        console.log("cart slice ",response.data)
        return response.data;
    }catch(er){
        toast.error(er?.response?.data?.message)
        console.log(er)
        console.log("er",er?.response?.data?.message)
        return er?.response?.data?.message;
    }
})

export const getCart = createAsyncThunk("cart/getCart",async (userId)=>{
    try{
        const response = await axios.get(`http://localhost:5000/api/v1/cart/getCartItems/${userId}`,{withCredentials:true,headers:{
            "Content-Type":"application/json"
        }})

        return response.data;
    }catch(er){
        return er?.response?.data?.message;
    }
}) 

export const updateCartQuntity = createAsyncThunk("cart/updateCartQuntity",async ({userId,productId,quantity})=>{
    try{
        const response = await axios.patch(`http://localhost:5000/api/v1/cart/updateQuntity`,{userId,productId,quantity},{withCredentials:true,headers:{
            "Content-Type":"application/json"
        }})

        return response.data;
    }catch(er){
        return er?.response?.data?.message;
    }
})

export const delteCartItem = createAsyncThunk("cart/delteCartItem",async (productId,userId)=>{
    try{
        const response = await axios.delete(`http://localhost:5000/api/v1/cart//deleteCartItem/${userId}/${productId}`,{withCredentials:true,headers:{
            "Content-Type":"application/json"
        }})

        return response.data;
    }catch(er){
        return er?.response?.data?.message;
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

        builder.addCase(addToCartProduct.pending,(state)=>{
            state.loading=true;
            state.cartItems=[];
            state.error=null;
        })
        builder.addCase(addToCartProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.cartItems=action.payload;
            state.error=null;
        })
        builder.addCase(addToCartProduct.rejected,(state,action)=>{
            state.loading=false;
            state.cartItems=[];
            state.error=action.payload;
        })

        builder.addCase(updateCartQuntity.pending,(state)=>{
            state.loading=true;
            state.cartItems=[];
            state.error=null;
        })
        builder.addCase(updateCartQuntity.fulfilled,(state,action)=>{
            state.loading=false;
            state.cartItems=action.payload;
            state.error=null;
        })
        builder.addCase(updateCartQuntity.rejected,(state,action)=>{
            state.loading=false;
            state.cartItems=[];
            state.error=action.payload;
        })

        builder.addCase(getCart.pending,(state)=>{
            state.loading=true;
            state.cartItems=[];
            state.error=null;
        })
        builder.addCase(getCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cartItems=action.payload;
            state.error=null;
        })
        builder.addCase(getCart.rejected,(state,action)=>{
            state.loading=false;
            state.cartItems=[];
            state.error=action.payload;
        })

        builder.addCase(delteCartItem.pending,(state)=>{
            state.loading=true;
            state.cartItems=[];
            state.error=null;
        })
        builder.addCase(delteCartItem.fulfilled,(state,action)=>{
            state.loading=false;
            state.cartItems=action.payload;
            state.error=null;
        })
        builder.addCase(delteCartItem.rejected,(state,action)=>{
            state.loading=false;
            state.cartItems=[];
            state.error=action.payload;
        })



    }
})

export default cartSlice.reducer;