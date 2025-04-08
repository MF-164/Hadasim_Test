import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { insertOrderForServer } from './orderSlice';
import AddIcon from '@mui/icons-material/Add';
import { store } from '../../app/store';

const AddOrder = ({ product }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState({
        id: 0, 
        orderDate: new Date().toISOString().split('T')[0], 
        quantity: product?.minQuantity || 0, 
        productId: product?.id, 
        status: 'New', 
        productName: product?.name || '', 
        providerId: product?.providerId, 
        providerName: product?.providerName || '' 
    });
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (product) {
            setOrder(prevOrder => ({
                ...prevOrder,
                productName: product.name,
                providerName: product.providerName,
                quantity: product.minQuantity
            }));
            setTotalPrice(product.price * product.minQuantity);
        }
    }, [product]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({
            ...order,
            [name]: value
        });
        if (name === 'quantity') {
            setTotalPrice(product.price * value);
        }
    };

    const handleAddOrder = () => {
        dispatch(insertOrderForServer(order));
        let status = store.getState().order.status
        if(status === 'failed'){
            alert('no valid order')
        }
        console.log("Adding new order:", order);
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
                Add New Order
            </Button>

            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Add New Order</DialogTitle>
                <DialogContent>
                    <br />
                    <TextField
                        name="productName"
                        label="Product Name"
                        fullWidth
                        value={order.productName}
                        disabled
                    />
                    <br /><br />
                    <TextField
                        name="providerName"
                        label="Provider Name"
                        fullWidth
                        value={order.providerName}
                        disabled
                    />
                    <br /><br />
                    <TextField
                        name="quantity"
                        label={`Quantity (min: ${product?.minQuantity})`}
                        fullWidth
                        type="number"
                        inputProps={{ min: product?.minQuantity }} // קביעת מינימום
                        value={order.quantity}
                        onChange={handleChange}
                    />
                    <br />
                    <div className='totalPrice'>
                        <strong>Total Price: </strong>${totalPrice}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddOrder}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddOrder;
