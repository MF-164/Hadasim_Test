import React from 'react';
import { Button, Card, CardHeader, CardContent, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Product = ({ product }) => {
    return (
        <Card sx={{ width: 300 }}>
            <CardHeader title={product.name} />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Price: {product.price}
                    <br />
                    Provider: {product.providerName}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Product;
