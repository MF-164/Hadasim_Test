
import { GetAll, GetOneById, GetByProviderId, Insert, UpdateStatus } from './OrderAPI'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const orderState = {
    allOrders: [],
    currentOrder: null,
    status: "idle"
}

export const fetchAllOrderFromServer = createAsyncThunk('Order-getAll', async () => {
    const response = await GetAll()
    return response
})

export const fetchOrderByIdFromServer = createAsyncThunk('Order-getOneById', async (id) => {
    const response = await GetOneById(id)
    return response
})

export const fetchOrdersByProviderIdFromServer = createAsyncThunk('Order-getByProviderId', async (providerId) => {
    console.log({providerId});
    
    const response = await GetByProviderId(providerId)
    return response
})

export const insertOrderForServer = createAsyncThunk('Order-insert', async (order) => {
    console.log({order});
    
    const response = await Insert(order)
    return response
})

export const updateStatusOrderForServer = createAsyncThunk('Order-updateStatus', async ({ id, newStatus }) => {
    console.log({ newStatus });
    console.log({ id });

    const response = await UpdateStatus(id, newStatus);
    return response;
});


export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: orderState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchAllOrderFromServer.fulfilled, (state, action) => {
            state.allOrders = action.payload
            state.status = "success"
        }).addCase(fetchAllOrderFromServer.rejected, (state) => {
            state.status = "failed"
        }).addCase(fetchAllOrderFromServer.pending, (state) => {
            state.status = "pending"
        })

        .addCase(fetchOrderByIdFromServer.fulfilled, (state, action) => {
            state.currentOrder = action.payload
        })

        .addCase(fetchOrdersByProviderIdFromServer.fulfilled, (state, action) => {
            state.allOrders = action.payload
            state.status = "success"
        }).addCase(fetchOrdersByProviderIdFromServer.rejected, (state) => {
            state.status = "failed"
        }).addCase(fetchOrdersByProviderIdFromServer.pending, (state) => {
            state.status = "pending"
        })

        .addCase(insertOrderForServer.fulfilled, (state, action) => {
            state.allOrders.push(action.payload)
        }).addCase(insertOrderForServer.rejected, (state) => {
            state.status = "failed"
        })

        .addCase(updateStatusOrderForServer.fulfilled, (state, action) => {
            const index = state.allOrders.findIndex(order => order.id === action.payload.id);
            console.log({index});
            
            if (index !== -1) {
                
                state.allOrders.splice(index, 1, action.payload);
                if (state.currentOrder && state.currentOrder.id === action.payload.Id) {
                    state.currentOrder = action.payload;
                }
            }
        })        
    }
})

export const { updateCurrentOrder } = orderSlice.actions

export default orderSlice.reducer