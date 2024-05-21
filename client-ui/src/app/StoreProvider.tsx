"use client"
import React, { useRef } from 'react'
import { AppStore, makeStore } from '@/lib/store/store'
import { Provider } from 'react-redux'
import { addToCart } from '@/lib/features/cart/cartSlice'

const StoreProvider = ({ children }: { children: React.ReactNode }) => {

    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {

        storeRef.current = makeStore()
        // * add initial id
        // storeRef.current.dispatch(addToCart('testprdoduct'));
    }
    return (<Provider store={storeRef.current}>{children}</Provider>)
}

export default StoreProvider