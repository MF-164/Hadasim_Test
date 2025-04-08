import Product from "./Product";
import List from '@mui/material/List';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByProviderIdFromServer, fetchProductsFromServer } from "./productSlice";
import { store } from '../../app/store';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Navbar from "../../../components/Navbar/Navbar";
import AddOrder from "../Order/AddOrder";
import AddProduct from "./AddProduct";

const ProductList = () => {
    let dispatch = useDispatch();
    const currentProvider = store.getState().provider.currentProvider
    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const currentProvider = store.getState().provider.currentProvider
        if (currentProvider.username === 'Admin' && currentProvider.password === 'Admin123')
            dispatch(fetchProductsFromServer())
        else{            
            dispatch(fetchProductsByProviderIdFromServer(currentProvider.id));
        }
    }

    let allProducts = store.getState().product.products;
    const status = useSelector(s => s.product.status);
    const error = useSelector(s => s.product.error);

    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Navbar />
                {currentProvider.username !== 'Admin' && currentProvider.password !== 'Admin123' &&
                <AddProduct providerId={currentProvider.id}></AddProduct>}
                <Paper square sx={{ pb: '50px' }}>
                    {status === 'success' && (
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {allProducts?.map(product => (
                                <div key={product.Id} className="card">
                                    <Product product={product} />
                                    {currentProvider.username === 'Admin' && currentProvider.password === 'Admin123' &&
                                        <AddOrder product={product}></AddOrder>}
                                </div>
                            ))}
                        </List>
                    )}
                    {(status === 'idle' || status === 'loading') && <h1>Loading...</h1>}
                    {status === 'failed' && <h1>Failed {error != null ? error : ''}</h1>}
                </Paper>
            </React.Fragment>
        </>
    );
}

export default ProductList;
