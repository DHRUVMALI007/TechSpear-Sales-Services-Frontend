import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../features/userSlice.js"
import productReducer from "../features/productSlice.js"
import cartReducer from "../features/cartSlice.js"
export const store= configureStore({
    reducer:{
        auth:userReducer,
        product:productReducer,
        cart:cartReducer
    }
})