import Order from "./Order";
import List from '@mui/material/List';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrderFromServer, fetchOrdersByProviderIdFromServer } from "./orderSlice";
import { store } from '../../app/store';
import OrderStatusButton from './OrderStatusButton';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import AddOrder from "./AddOrder";

const OrderList = () => {
    const { statusFilter } = useParams()
    const currentProvider = store.getState().provider.currentProvider;

    let dispatch = useDispatch();

    React.useEffect(() => {
        fetchData();
    }, [currentProvider.username, currentProvider.password]);

    const fetchData = () => {
        if (currentProvider.username === 'Admin' && currentProvider.password === 'Admin123') {
            dispatch(fetchAllOrderFromServer());
        } else {
            dispatch(fetchOrdersByProviderIdFromServer(currentProvider.id));
        }
    }

    let allOrders = useSelector(s => s.order.allOrders);
    const status = useSelector(s => s.order.status);
    const error = useSelector(s => s.order.error);

    const filterByStatus = (orders, statusFilter) => {
        if (statusFilter === 'all') {
            console.log(orders);

            return orders;
        }
        console.log(orders);
        return orders.filter(order => order.status === statusFilter);
    }

    const filteredOrders = allOrders !== null ? filterByStatus(allOrders, statusFilter): [];

    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Navbar></Navbar>
                <Paper square sx={{ pb: '50px' }}>
                    {status === 'success' && (
                        <>
                            {filteredOrders.length === 0 ? (
                                <h1>Not found orders</h1>
                            ) : (
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    {filteredOrders.map(order => (
                                        <div key={order.id} className="card">
                                            <Order order={order}></Order>
                                            <OrderStatusButton order={order} />
                                        </div>
                                    ))}
                                </List>
                            )}
                        </>
                    )}
                    {(status === 'idle' || status === 'loading') && <h1>Loading...</h1>}
                    {status === 'failed' && <h1>Failed {error != null ? error : ''}</h1>}
                </Paper>
            </React.Fragment>
        </>
    );

}

export default OrderList;
