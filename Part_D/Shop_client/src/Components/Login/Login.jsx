import React from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';

import { loginProviderForServer } from '../../store/features/Provider/providerSlice';
import { store } from '../../store/app/store';

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
    width: '60%'
});

const ProvidersLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur'
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickLogin = (user) => {
        dispatch(loginProviderForServer(user)).then(() => {
            let currentProvider = store.getState().provider.currentProvider;            
            if (currentProvider != null || currentProvider != undefined) {                
                if(currentProvider.username === 'Admin' && currentProvider.password === 'Admin123')
                    navigate('/providers');
                else
                    navigate('/orders/all')
            } else {
                navigate('/SignUp');
            }
        });
    };

    return (
        <div className='ProvidersLogin'>
            <form className='ProvidersLoginform' onSubmit={handleSubmit(handleClickLogin)}>
                <div className='header'>
                    <u><h2>Providers Login</h2></u>
                    <span>Please sign in to continue.</span>
                </div>
                <TextField 
                    id="username" 
                    label={`Username ${errors.username?.type === "required" ? '*' : ''}`} 
                    variant="standard"
                    {...register("username", { pattern: /^[A-Za-z]+$/i, required: true, maxLength: 15 })}
                    InputProps={{
                        endAdornment: (
                            <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        ),
                    }}
                />
                {errors.username?.type === 'pattern' && <Alert severity="warning">Please enter only English letters.</Alert>}
                {errors.username?.type === 'maxLength' && <Alert severity="warning">Please enter a valid username that is at most 15 characters.</Alert>}

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password {errors.password?.type === "required" ? '*' : ''}</InputLabel>
                    <Input 
                        id="password" 
                        type={showPassword ? 'text' : 'password'}
                        {...register("password", { minLength: 4, maxLength: 8, required: true })}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {errors.password?.type === 'minLength' && <Alert severity="error">Please enter a valid password that is at least 4 characters.</Alert>}
                    {errors.password?.type === 'maxLength' && <Alert severity="warning">Please enter a valid password that is at most 8 characters.</Alert>}
                </FormControl>

                <div className='btnSubmit'>
                    <BootstrapButton variant="contained" type='submit'>Log In</BootstrapButton>
                    <div>
                        <span>Don't have an account? &nbsp;</span>
                        <Link to='/SignUp'>Sign Up</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProvidersLogin;
