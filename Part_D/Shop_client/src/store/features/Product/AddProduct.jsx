import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { insertProductForServer } from './productSlice';
import AddIcon from '@mui/icons-material/Add';

const AddProduct = ({ providerId, onProductAdded }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        id: 0,
        name: '',
        price: '',
        minQuantity: '',
        providerId: providerId,
        providerName: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    };

    const handleAddProduct = () => {
        dispatch(insertProductForServer(newProduct));
        console.log("Adding new product:", newProduct);
        onProductAdded()
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
                Add New Product
            </Button>

            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent>
                    <br />
                    <TextField
                        name="name"
                        label="Product Name"
                        fullWidth
                        onChange={handleChange}
                    />
                    <br />
                    <br/>
                    <TextField
                        name="price"
                        label="Price"
                        fullWidth
                        type="number"
                        onChange={handleChange}
                    />
                    <br />
                    <br/>
                    <TextField
                        name="minQuantity"
                        label="Minimum Quantity"
                        fullWidth
                        type="number"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddProduct}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddProduct;
