import { useState } from 'react';
import './SignUp.scss'


import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Person4Icon from '@mui/icons-material/Person4';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Alert from '@mui/material/Alert';

import { signupToWebSite } from '../../store/features/Client/clientSlice';

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
    // const [value, setValue] = useState()
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const dis = useDispatch();
    let navigate = useNavigate()
    
    const { register, handleSubmit, getValues, formState: { errors, dirtyFields, isDirty, isValid } } = useForm({
        mode: 'onBlur'
    })

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSave = (newClient) => {
        newClient.id = 0
        newClient.role = ""
        console.log({ newClient });
        dis(signupToWebSite(newClient)).then(() => navigate('/home'))
    }

    return (
        <div className='SignUp'>
            <form className='SignUpform' onSubmit={handleSubmit(handleSave)}>
                <div className='header'>
                    <u><h2>SignUp</h2></u>
                    <span>Sing in to continue.</span>
                </div>
                <TextField id="username" label={`UserName ${errors.username?.type == "required" ? '*' : ''}`} variant="standard"
                    {...register("username", { pattern: /^[ A-Za-z]+$/i, required:true, maxLength: 15 })}
                    InputProps={{
                        endAdornment: (
                            <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        ),
                    }}
                />
                {errors.username?.type === 'pattern' && <Alert severity="warning">please enter only english letters.</Alert>}
                {errors.username?.type === 'maxLength' && <Alert severity="warning">please enter a valid user name that is at least 25 letters.</Alert>}
                <br />

                <TextField
                    id="name"
                    label="Name"
                    variant="standard"
                    {...register("name", { pattern: /^[ A-Za-z]+$/i, maxLength: 25 })}
                    InputProps={{
                        endAdornment: (
                            <Person4Icon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        ),
                    }}
                />
                {errors.name?.type === 'pattern' && <Alert severity="warning">please enter only english letters.</Alert>}
                {errors.name?.type === 'maxLength' && <Alert severity="warning">please enter a valid user name that is at least 25 letters.</Alert>}

                <br />

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password {errors.password?.type == "required" ? '*' : ''}</InputLabel>
                    <Input id="password" type={showPassword ? 'text' : 'password'}
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
                    {errors.password?.type === 'minLength' && <Alert severity="error">Please enter a valid password that is at more 3 characters.</Alert>}
                    {errors.password?.type === 'maxLength' && <Alert severity="warning">please enter a valid user name that is at least 9 characters.</Alert>}

                </FormControl>

                <br />
                <TextField
                    id="phone"
                    label="Phone"
                    variant="standard"
                    {...register("phone", { pattern: /^[0-9]+$/i, minLength: 10, maxLength: 10 })}
                    InputProps={{
                        endAdornment: (
                            <LocalPhoneOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        ),
                    }}
                />
                {errors.phone?.type === 'pattern' && <Alert severity="error">Please enter only numbers.</Alert>}
                {errors.phone?.type === 'minLength' && <Alert severity="error">Please enter a valid password that is at more 3 numbers.</Alert>}
                {errors.phone?.type === 'maxLength' && <Alert severity="warning">Please enter a valid user name that is at least 9 numbers.</Alert>}
                <br />

                <TextField
                    id="city"
                    label="City"
                    variant="standard"
                    {...register("city", { pattern: /^[ A-Za-z]+$/i, maxLength: 15 })}
                    InputProps={{
                        endAdornment: (
                            <LocationCityOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        ),
                    }}
                />
                {errors.city?.type === 'pattern' && <Alert severity="warning">please enter only english letters.</Alert>}
                {errors.city?.type === 'maxLength' && <Alert severity="warning">Please enter a valid user name that is at least 15 numbers.</Alert>}
                <br />

                <TextField
                    id="address"
                    label="Address"
                    variant="standard"
                    {...register("address", { pattern: /^[ A-Za-z]+$/i, maxLength: 15 })}
                    InputProps={{
                        endAdornment: (
                            <HomeWorkOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        ),
                    }}
                />
                {errors.address?.type === 'pattern' && <Alert severity="warning">please enter only english letters.</Alert>}
                {errors.address?.type === 'maxLength' && <Alert severity="warning">Please enter a valid user name that is at least 15 numbers.</Alert>}
                <br />
                <TextField
                    id="housenumber"
                    label="HouseNumber"
                    variant="standard"
                    {...register("housenumber", { pattern: /^[0-9]+$/i, minLength: 1, maxLength: 3 })}
                    InputProps={{
                        endAdornment: (
                            <HouseOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        ),
                    }}
                />
                {errors.housenumber?.type === 'pattern' && <Alert severity="error">Please enter only numbers.</Alert>}
                {errors.housenumber?.type === 'minLength' && <Alert severity="warning">Please enter a valid password that is at more 0 numbers.</Alert>}
                {errors.housenumber?.type === 'maxLength' && <Alert severity="warning">Please enter a valid user name that is at least 3 numbers.</Alert>}
                <br />
                <div className='btnSubmit'>
                    <BootstrapButton variant="contained" disabled={!isValid} type='Submit'>Log in</BootstrapButton>
                </div>
            </form>
        </div>
    )
}

export default SignUp