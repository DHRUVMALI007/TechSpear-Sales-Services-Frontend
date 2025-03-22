import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const baseUrl= "http://localhost:5000/api/v1/products"


export const uploadProduct= createAsyncThunk("product/upload",async ()=>{
    try{
        const response = await axios.post(`${baseUrl}/createProduct/`,{withCredentials:true},{headers:{
            headers: { "Content-Type": "multipart/form-data" }
        }})
        return response.data
    }
    catch(er){
        return er;
    }
})

export const getAllProduct = createAsyncThunk("product/getall",async()=>{
    try{
        const response = await axios.get(`${baseUrl}/getAllProducts`,{withCredentials:true})

        console.log(response.data)
        return response.data;
    }
    catch(error){
        return error
    }
})

export const updateProduct= createAsyncThunk("product/update",async (productId)=>{
    try{
        const response = await axios.patch(`${baseUrl}/updateProductDetails/${productId}`,{withCredentials:true})
        return response.data
    }
    catch(er){
        return er;
    }
})

export const updateMainProductImg= createAsyncThunk("product/update/imgMain",async (productId)=>{
    try{
        const response = await axios.patch(`${baseUrl}/updateMainImg/${productId}`,{withCredentials:true},{headers:{
            "Content-Type": "multipart/form-data" 
        }})
        return response.data
    }
    catch(er){
        return er;
    }
})

export const updateOtherProductImg= createAsyncThunk("product/update/imgOther",async (productId)=>{
    try{
        const response = await axios.patch(`${baseUrl}/updateOtherImg/${productId}`,{withCredentials:true},{headers:{
            "Content-Type": "multipart/form-data" 
        }})
        return response.data
    }
    catch(er){
        return er;
    }
})

export const deleteProduct= createAsyncThunk("product/delete",async (productId)=>{
    try{
        const response = await axios.delete(`${baseUrl}/deleteProduct/${productId}`,{withCredentials:true})
        return response.data
    }
    catch(er){
        return er;
    }
})

const productSlice = createSlice({
    name:"product",
    initialState:{
        product:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProduct.pending,(state,action)=>{
            state.product=null;
            state.loading=true;
            state.error=null;
        })
        builder.addCase(getAllProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.product=action.payload;
            state.error= null;
        })
        builder.addCase(getAllProduct.rejected,(state,action)=>{
            state.loading=false;
            state.product=null;
            state.error= action.payload;
        })

        builder.addCase(updateProduct.pending,(state,action)=>{
            state.product=[];
            state.loading=true;
            state.error=null;
        })
        builder.addCase(updateProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.product=action.payload;
            state.error= null;
        })
        builder.addCase(updateProduct.rejected,(state,action)=>{
            state.loading=false;
            state.product=[];
            state.error= action.payload;
        })

        builder.addCase(deleteProduct.pending,(state,action)=>{
            state.product=[];
            state.loading=true;
            state.error=null;
        })
        builder.addCase(deleteProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.product=action.payload;
            state.error= null;
        })
        builder.addCase(deleteProduct.rejected,(state,action)=>{
            state.loading=false;
            state.product=[];
            state.error= action.payload;
        })
    }
})


export default productSlice.reducer;