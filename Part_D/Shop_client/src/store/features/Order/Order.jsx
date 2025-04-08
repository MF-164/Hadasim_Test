import * as React from 'react';
import './Order.scss';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';

const Order = ({ order }) => {
    
    const displayDate = (date) => {
        let dayDate = date.slice(0, 10);
        let array = dayDate.split('-');
        array.reverse();
        dayDate = array.join('/');
        return dayDate;
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'New':
                return '#c8e6c9'; 
            case 'Process':
                return '#fff9c4'; 
            case 'Completed':
                return '#bbdefb'; 
            default:
                return '#f0f0f0';
        }
    }

    const cardColor = getStatusColor(order?.status);

    return (
        <Card sx={{ width: 300, margin: '16px', backgroundColor: cardColor }} className='order-card'>
            <CardHeader title={`Order ID: ${order?.id}`} />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Date: {displayDate(order?.orderDate)}
                    <br />
                    Quantity: {order?.quantity}
                    <br />
                    Product Name: {order?.productName}
                    <br />
                    Provider Name: {order?.providerName}
                    <br/>
                    <span>Status: {order?.status}</span>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Order;
