import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "../features/userSlice.js";
import productReducer from "../features/productSlice.js";
import cartReducer from "../features/cartSlice.js";

// Separate persist configs for each reducer
const userPersistConfig = {
  key: "auth",
  storage,
};

const productPersistConfig = {
  key: "product",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedAuthReducer = persistReducer(userPersistConfig, userReducer);
const persistedProductReducer = persistReducer(productPersistConfig, productReducer);


export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    product: persistedProductReducer,
    cart: cartReducer,
  },
});

export const persistor = persistStore(store);
