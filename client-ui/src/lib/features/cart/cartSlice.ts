import { createSlice } from '@reduxjs/toolkit'

export interface CartState {
  items:string[];
}

const initialState: CartState = {
    items:[]
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart:(state,action)=>{
        // Magic
        // Immer will handle the mutation
        state.items.push(action.payload);
    }
  },
})


export const { addToCart } = cartSlice.actions

export default cartSlice.reducer