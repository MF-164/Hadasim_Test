import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAll, GetOneById, GetOneByProviderId, Insert } from './ProductAPI';

const initialState = {
    products: [],
    currentProduct: null,
    status: 'idle',
    error: null
};

export const fetchProductByIdFromServer = createAsyncThunk("product/getOneById", async (id) => {
    const response = await GetOneById(id);
    return response;
});

export const fetchProductsByProviderIdFromServer = createAsyncThunk("product/getByProviderId", async (providerId) => {
    const response = await GetOneByProviderId(providerId);    
    return response;
});

export const fetchProductsFromServer = createAsyncThunk("product/getall", async () => {
    const response = await GetAll();    
    return response;
});

export const insertProductForServer = createAsyncThunk("product/insert", async (product) => {
    const response = await Insert(product);
    return response;
});

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductByIdFromServer.fulfilled, (state, action) => {
                state.currentProduct = action.payload;
                state.status = "success";
            })
            .addCase(fetchProductByIdFromServer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchProductByIdFromServer.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductsByProviderIdFromServer.fulfilled, (state, action) => {                
                state.products = action.payload;
                state.status = "success";
            })
            .addCase(fetchProductsByProviderIdFromServer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchProductsByProviderIdFromServer.pending, (state) => {
                state.status = "loading";
            })
            .addCase(insertProductForServer.fulfilled, (state, action) => {
                state.products.push(action.payload);
                state.status = "success";
            })
            .addCase(insertProductForServer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(insertProductForServer.pending, (state) => {
                state.status = "loading";
            }) 
            .addCase(fetchProductsFromServer.fulfilled, (state, action) => {                
                state.products = action.payload;
                state.status = "success";
            })
            .addCase(fetchProductsFromServer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchProductsFromServer.pending, (state) => {
                state.status = "loading";
            })
    }
});

export const { setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
