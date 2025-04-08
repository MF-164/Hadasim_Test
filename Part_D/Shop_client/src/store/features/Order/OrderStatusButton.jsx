import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateStatusOrderForServer } from './orderSlice';
import { store } from '../../app/store';

const OrderStatusButton = ({ order }) => {
    const dispatch = useDispatch();
    const currentProvider = store.getState().provider.currentProvider;

    const handleStatusChange = () => {
        let newStatus = order.status;
        if (currentProvider.username === 'Admin' && currentProvider.password === 'Admin123') {
            console.log('admin chenge');
            if (order.status === 'Process') {
                console.log('admin chenge');
                
                newStatus = 'Completed';
            } else {
                console.log('admin dont chenge');

                return;
            }
        } else {
            if (order.status === 'New') {
                newStatus = 'Process';
            } else {
                return;
            }
        }
        console.log({ order });

        dispatch(updateStatusOrderForServer({ id: order.id, newStatus }));
    };

    return (
        <Button variant="contained" onClick={handleStatusChange}>
            {order.status}
        </Button>
    );
};

export default OrderStatusButton;
