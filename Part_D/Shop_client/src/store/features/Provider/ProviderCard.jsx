import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';

const ProviderCard = ({ provider }) => {
    return (
        <Card sx={{ width: 1000 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {provider.representativeName?.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={provider.companyName}
                subheader={provider.representativeName}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <b>Phone:</b> {provider.phone}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ProviderCard
