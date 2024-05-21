import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../features/cart/cartSlice";
import productSlice from '../features/product/productSlice';
// store is a global variable. 

// Don't do this in next js as its share this global state to all users in 
// need to create per request

export const makeStore = ()=>{
    return configureStore({
    reducer: {
      cart: cartReducer,
      product:productSlice
     },
     })
} 

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']