import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const baseUrl = "http://localhost:5000/api/v1/products"


export const uploadProduct = createAsyncThunk("product/upload", async (formData, { rejectWithValue }) => {
    const token = localStorage.getItem("token")

    try {
        const response = await axios.post(`${baseUrl}/createProduct`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        });
        console.log("state data")
        console.log(response.data)

        return response.data
    }
    catch (er) {
        return er?.response?.data?.message;
    }
})

export const getAllProduct = createAsyncThunk("product/getall", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("User is Not Authenticated.");
    }

    try {
        console.log("Token:", token);

        const response = await axios.get(`${baseUrl}/getAllProducts`, {
            withCredentials: true,
            headers: { "Authorization": `Bearer ${token}` }
        });

        console.log("API Response:", response.data);
        return response.data;
    }
    catch (error) {
        console.log("API Error:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message || "Something went wrong");
    }
});

export const updateProduct = createAsyncThunk("product/update", async ({ editId, formData }) => {

    try {
        // console.log('test dt',tdata)
        const token = localStorage.getItem("token");
        // const response = await axios.put(`${baseUrl}/updateProductDetails/${editId}`, formData,   {
        //     withCredentials: true,
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         "Authorization":`Bearer ${token}` 
        //     }
        // });

        const response = await fetch(`${baseUrl}/updateProductDetails/${editId}`, {
            method: "PUT",
            credentials: "include",
            body: formData
        })

        console.log(`${baseUrl}/updateProductDetails/${editId}`)
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        const data = await response.json();
        console.log(data)
        return data
    }
    catch (er) {
        // return er?.response?.data?.message;
        return er.message
    }
})


export const deleteProduct = createAsyncThunk("product/delete", async (productId) => {
    const token = localStorage.getItem("token")
    if (!token) {
        return "Unauthorize request."
    }
    try {
        const response = await axios.delete(`${baseUrl}/deleteProduct/${productId}`, { withCredentials: true }, { headers: { "Authorization": `Bearer ${token}` } })
        return response.data
    }
    catch (er) {
        return er?.response?.data?.message;
    }
})

export const getSingleProductDetails = createAsyncThunk("product/detailed", async (productId) => {
    try {
        const response = await axios.get(`${baseUrl}/getSingleProduct/${productId}`)
        console.log(response.data)
        return response.data
    }
    catch (er) {
        return er?.response?.data?.message;
    }
})

export const stockManagement = createAsyncThunk("product/stockMange", async ({ productId, stock }) => {
    let token= localStorage.getItem("token");
    if(!token){
        throw new Error("User not Authenticated")
    }
    try {
        const response = await axios.patch(`${baseUrl}/stockManage`,{productId,stock},{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data
    }
    catch (er) {
        return er?.response?.data?.message;
    }
})


const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.pending, (state, action) => {
            state.product = null;
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = null;
        })
        builder.addCase(getAllProduct.rejected, (state, action) => {
            state.loading = false;
            state.product = null;
            state.error = action.payload;
        })

        builder.addCase(deleteProduct.pending, (state, action) => {
            state.product = [];
            state.loading = true;
            state.error = null;
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = [];
            state.error = null;
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.product = [];
            state.error = action.payload;
        })



        builder.addCase(uploadProduct.pending, (state, action) => {
            state.product = [];
            state.loading = true;
            state.error = null;
        })
        builder.addCase(uploadProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = null;


        })
        builder.addCase(uploadProduct.rejected, (state, action) => {
            state.loading = false;
            state.product = [];
            state.error = action.payload;
        })
    }
})


export default productSlice.reducer;