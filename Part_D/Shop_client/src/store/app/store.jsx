import { configureStore } from '@reduxjs/toolkit'
import productSlice from '../features/Product/productSlice'
import providerSlice from '../features/Provider/providerSlice'
import orderSlice from '../features/Order/orderSlice'

export const store = configureStore({
    reducer: {
        order: orderSlice,
        product: productSlice,
        provider: providerSlice
    }
})