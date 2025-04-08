import { useState } from 'react';
import './SignUp.scss';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import { insertProviderForServer } from '../../store/features/Provider/providerSlice';
import IconButton from '@mui/material/IconButton';
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
})

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: 'onBlur'
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSave = (newProvider) => {
        newProvider.id = 0;
        dispatch(insertProviderForServer(newProvider)).then(() => {
            const currentProvider = store.getState().provider.currentProvider;
            if (currentProvider && currentProvider.id) {
                navigate('/products');
            } else {
                console.error("Failed to retrieve current provider.");
            }
        }).catch((error) => {
            console.error("Error creating provider:", error);
        });
    };    

    return (
        <div className='SignUp'>
            <form className='SignUpform' onSubmit={handleSubmit(handleSave)}>
                <div className='header'>
                    <u><h2>Sign Up as Provider</h2></u>
                    <span>Sign in to continue.</span>
                </div>

                <TextField
                    id="companyName"
                    label={`Company Name ${errors.companyName?.type === "required" ? '*' : ''}`}
                    variant="standard"
                    {...register("companyName", { required: true })}
                    InputProps={{
                        endAdornment: (
                            <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        ),
                    }}
                />
                {errors.companyName?.type === 'required' && <Alert severity="warning">Company name is required.</Alert>}
                <br />

                <TextField
                    id="username"
                    label={`Username ${errors.username?.type === "required" ? '*' : ''}`}
                    variant="standard"
                    {...register("username", { required: true })}
                    InputProps={{
                        endAdornment: (
                            <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        ),
                    }}
                />
                {errors.username?.type === 'required' && <Alert severity="warning">Username is required.</Alert>}
                <br />

                <TextField
                    id="phone"
                    label={`Phone ${errors.phone?.type === "required" ? '*' : ''}`}
                    variant="standard"
                    {...register("phone", { required: true, pattern: /^[0-9]+$/, minLength: 10, maxLength: 10 })}
                    InputProps={{
                        endAdornment: (
                            <LocalPhoneOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        ),
                    }}
                />
                {errors.phone?.type === 'required' && <Alert severity="warning">Phone number is required.</Alert>}
                {errors.phone?.type === 'pattern' && <Alert severity="error">Please enter only numbers.</Alert>}
                <br />

                <TextField
                    id="representativeName"
                    label={`Representative Name ${errors.representativeName?.type === "required" ? '*' : ''}`}
                    variant="standard"
                    {...register("representativeName", { required: true })}
                    InputProps={{
                        endAdornment: (
                            <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        ),
                    }}
                />
                {errors.representativeName?.type === 'required' && <Alert severity="warning">Representative name is required.</Alert>}
                <br />

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password {errors.password?.type === "required" ? '*' : ''}</InputLabel>
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        {...register("password", { required: true, minLength: 4, maxLength: 8 })}
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
                    {errors.password?.type === 'required' && <Alert severity="error">Password is required.</Alert>}
                    {errors.password?.type === 'minLength' && <Alert severity="error">Password must be at least 4 characters.</Alert>}
                    {errors.password?.type === 'maxLength' && <Alert severity="warning">Password must be at most 8 characters.</Alert>}
                </FormControl>

                <div className='btnSubmit'>
                    <BootstrapButton variant="contained" disabled={!isValid} type='Submit'>Sign Up</BootstrapButton>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
