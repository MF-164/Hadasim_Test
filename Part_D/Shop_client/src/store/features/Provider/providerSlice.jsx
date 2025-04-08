import { GetAll, GetOneById, Insert, Login } from './ProviderAPI';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const providerState = {
    allProviders: [],
    currentProvider: //{username:'Admdin', password:'Admin123', id: 2},//
    null,
    status: "idle"
}

export const fetchAllProvidersFromServer = createAsyncThunk('provider-getAll', async () => {
    const response = await GetAll();
    return response;
});

export const fetchProviderByIdFromServer = createAsyncThunk('provider-getOne', async (id) => {
    const response = await GetOneById(id);
    return response;
});

export const insertProviderForServer = createAsyncThunk('provider-insert', async (provider) => {
    console.log({provider});
    
    const response = await Insert(provider);
    return response;
});

export const loginProviderForServer = createAsyncThunk('provider-login', async (provider) => {
    console.log('loginProviderForServer: ', {provider});
    
    const response = await Login(provider);
    return response;
});

export const providerSlice = createSlice({
    name: 'providerSlice',
    initialState: providerState,
    reducers: {
        updateCurrentProvider: (state, action) => {
            state.currentProvider = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProvidersFromServer.fulfilled, (state, action) => {
            state.allProviders = action.payload;
            state.status = "success";
        }).addCase(fetchAllProvidersFromServer.rejected, (state) => {
            state.status = "failed";
        }).addCase(fetchAllProvidersFromServer.pending, (state) => {
            state.status = "pending";
        })
        .addCase(fetchProviderByIdFromServer.fulfilled, (state, action) => {
            state.currentProvider = action.payload;
        })
        .addCase(insertProviderForServer.fulfilled, (state, action) => {
            state.allProviders.push(action.payload);
            state.currentProvider = action.payload
        })
        .addCase(loginProviderForServer.fulfilled, (state, action) => {
            state.currentProvider = action.payload
        });
    }
});

export const { updateCurrentProvider } = providerSlice.actions;

export default providerSlice.reducer;
