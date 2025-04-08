import * as React from 'react';
import List from '@mui/material/List';
import './ProviderStyle.scss';
import ProviderCard from "./ProviderCard";

import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProvidersFromServer } from './providerSlice';
import { store } from '../../app/store';
import Navbar from '../../../components/Navbar/Navbar';

function GradientCircularProgress() {
    return (
        <React.Fragment>
            <svg width={0} height={0}>
                <defs>
                    <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#e01cd5" />
                        <stop offset="100%" stopColor="#1CB5E0" />
                    </linearGradient>
                </defs>
            </svg>
            <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
        </React.Fragment>
    );
}

const ProviderList = () => {
    let dispatch = useDispatch();

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        dispatch(fetchAllProvidersFromServer());
    }

    let allProviders = store.getState().provider.allProviders;
    const status = useSelector(s => s.provider.status);

    return (
        <>
            <Navbar></Navbar>
            {status === 'success' &&
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {allProviders.map(
                        provider => <div key={provider.id} className="card"><ProviderCard provider={provider} /></div>
                    )}
                </List>}
            {status === 'loading' && <div>
                <br />
                <GradientCircularProgress />
            </div>}
        </>
    );
}

export default ProviderList;
