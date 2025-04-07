import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import { updateAllLadiesState } from "../../store/features/CleaningLady/cleaningLadySlice"
import { store } from "../../store/app/store";
import './Navbar.scss'
import { useDispatch, useSelector } from 'react-redux';
import { updateAllClientState } from '../../store/features/Client/clientSlice';
import TextField from '@mui/material/TextField';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog from '@mui/material/Dialog';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DialogContentText from '@mui/material/DialogContentText';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { deleteClientFromServer, updateClientOnServer } from '../../store/features/Client/clientSlice';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const StyledSelect = {
    m: 1,
    minWidth: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.176)',
    borderRadius: '10px',
    border: 'solid none',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.286)',
    },
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const Navbar = ({ list }) => {
    let dispatch = useDispatch()
    let currentClient = store.getState().client.currentClient.client
    console.log({ currentClient });
    const cleaningLadies = useSelector(v => v.cleaningLady.allCleaningLadies.ladies)
    console.log(cleaningLadies)
    let clients = store.getState().client.allClients.clients
    // let cleaningLadies = store.getState().cleaningLady.allCleaningLadies.ladies
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const openM = Boolean(anchorEl1);
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);
    let phoneFlag = false;
    let phoneFlag2 = false
    let houseNumber = false

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseWithSave = () => {
        setOpen(false)
        console.log({ client });
        let id = client.id
        dis(updateClientOnServer({ ...editClient, id }))
    }

    const dis = useDispatch()
    let client = useSelector(s => s.client.currentClient.client)
    let editClient = {
        userName: client?.userName,
        name: client?.name,
        password: client?.password,
        phone: client?.phone,
        city: client?.city,
        address: client?.address,
        houseNumber: client?.houseNumber,
        role: client?.role
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleBlurPhone = (e) => {
        const tel = e.target.value
        if (tel.length === 10 || tel.length === 9) {
            e.target.value = tel
            editClient.phone = tel
            phoneFlag2 = false
        }
        else {
            phoneFlag2 = true
        }



    }
    const handleChangePhone = (e) => {
        const tel = e.target.value
        if (tel.charAt(tel.length - 1) > '9' || tel.charAt(tel.length - 1) < '0' || tel.length > 10) {
            e.target.value = tel.slice(0, tel.length - 1)
            phoneFlag = true
        }
        else {
            e.target.value = tel
            phoneFlag = false
        }
        phoneFlag2 = false
    }
    const handleChangeHouseNumber = (e) => {
        houseNumber = false
        const num = e.target.value
        if (num.charAt(num.length - 1) > '9' || num.charAt(num.length - 1) < '0' || num.length > 2) {
            e.target.value = num.slice(0, num.length - 1)
            houseNumber = true
        }

    }
    const handleChangeCity = (e) => {
        const city = e.target.value;
        if (!((city.charAt(city.length - 1) >= 'a' && city.charAt(city.length - 1) <= 'z') ||
            (city.charAt(city.length - 1) >= 'A' && city.charAt(city.length - 1) <= 'Z') || (city.charAt(city.length - 1) === ' ')))
            e.target.value = city.slice(0, city.length - 1)

    }

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to='/' className='connect'>
                <MenuItem onClick={handleMenuClose}>
                    <LogoutIcon sx={{ fontSize: 'medium' }} />
                    &nbsp;Log Out
                </MenuItem>
            </Link>
            <Link to='/SignUp' className='connect'>
                <MenuItem onClick={handleMenuClose}>
                    <LoginIcon sx={{ fontSize: 'medium' }} />
                    &nbsp;Sing Up
                </MenuItem>
            </Link>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>
                    My account
                </p>

            </MenuItem>
        </Menu>
    );

    // menu


    const handleClick = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    //search 

    const [filter, setFilter] = React.useState('');
    const handleChange = (event) => {
        debugger
        setFilter(event.target.value);
        if (list === "clients") {
            if (event.target.value == "city")
                sortByCityClient(clients)
            if (event.target.value == "name")
                sortByNameClient(clients)
        } else {
            if (event.target.value == "city")
                debugger
            sortByCityLadies(cleaningLadies)
            if (event.target.value == "name")
                sortByNameLadies(cleaningLadies)
        }

    };

    const sortByCityClient = (array) => {
        debugger
        [...array].sort((a, b) => {
            if (a.city < b.city)
                return -1
            if (a.city > b.city)
                return 1
            return 0
        })
        dispatch(updateAllClientState(array))
    }

    const sortByNameClient = (array) => {
        array.sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        })
        dispatch(updateAllClientState(array))
    }

    const sortByCityLadies = (array) => {
        debugger
        [...array].sort((a, b) => {
            if (a.city < b.city)
                return -1
            if (a.city > b.city)
                return 1
            return 0
        })
        dispatch(updateAllLadiesState(array))
    }

    const sortByNameLadies = (array) => {
        array.sort((a, b) => {
            if (a.firstName < b.firstName)
                return -1
            if (a.firstName > b.firstName)
                return 1
            return 0
        })
        dispatch(updateAllLadiesState(array))
    }


    const handleChangeSearch = (e) => {
        // let temp = list
        // if (filter === 'name')
        //     temp = list.filter(lady => (lady?.FirstName + ' ' + lady?.LastName).includes(e.value))
        // else if (filter === 'city')
        //     temp = list.filter(lady => lady?.City.includes(e.value))
        // // TODO:send 'temp' to update list!
    }

    return (
        <div className='navbar'>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <div>
                    
                            <React.Fragment>
                            <Button variant="none" onClick={handleClickOpen}>
                                <MenuIcon sx={{ fontSize: 'xx-large' }} titleAccess='my account'/>
                            </Button>
                            <div className='around'>
                                <div className='contant'>
                                    <BootstrapDialog
                                        onClose={handleClose}
                                        aria-labelledby="customized-dialog-title"
                                        open={open}
                                    >
                                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                            Edit your details
                                        </DialogTitle>

                                        <IconButton
                                            aria-label="close"
                                            onClick={handleClose}
                                            sx={{
                                                position: 'absolute',
                                                right: 8,
                                                top: 8,
                                                color: (theme) => theme.palette.grey[500],
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        <DialogContent >
                                            <DialogContentText id="alert-dialog-slide-description" sx={{ display: 'block' }}>
                                                <br />

                                                <TextField
                                                    id="input-with-sx"
                                                    label="Username"
                                                    variant="standard"
                                                    defaultValue={client?.name}
                                                    onChange={handleChangeCity}
                                                    onBlur={(e) => { editClient.name = e.target.value }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                        ),
                                                    }}
                                                />
                                                <br />

                                                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                                    <Input
                                                        id="standard-adornment-password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        defaultValue={client?.password}
                                                        onBlur={(e) => { editClient.password = e.target.value }}
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
                                                </FormControl>
                                                <br />
                                                <TextField
                                                    id="input-with-sx"
                                                    label="Phone"
                                                    variant="standard"
                                                    defaultValue={client?.phone}
                                                    onChange={handleChangePhone}
                                                    onBlur={handleBlurPhone}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <LocalPhoneOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                        ),
                                                    }}
                                                />
                                                <br />
                                                {phoneFlag && <Alert severity="error">phone contains just numbers!</Alert>}
                                                {phoneFlag2 && <Alert severity="warning">Invalid phone number!</Alert>}

                                                <TextField
                                                    id="input-with-sx"
                                                    label="City"
                                                    variant="standard"
                                                    defaultValue={client?.city}
                                                    onBlur={(e) => { editClient.city = e.target.value }}
                                                    onChange={handleChangeCity}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <LocationCityOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                        ),
                                                    }}
                                                />
                                                <br />

                                                <TextField
                                                    id="input-with-sx"
                                                    label="Address"
                                                    variant="standard"
                                                    defaultValue={client?.address}
                                                    onBlur={(e) => { editClient.address = e.target.value }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <HomeWorkOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                        ),
                                                    }}
                                                />
                                                <br />
                                                <TextField
                                                    id="input-with-sx"
                                                    label="HouseNumber"
                                                    variant="standard"
                                                    defaultValue={client?.houseNumber}
                                                    onBlur={(e) => { editClient.houseNumber = e.target.value }}
                                                    onChange={handleChangeHouseNumber}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <HouseOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                        ),
                                                    }}
                                                />
                                                {houseNumber && <Alert severity="error">you type uncorrect tav</Alert>}
                                                <br />
                                            </DialogContentText>
                                        </DialogContent>



                                        <DialogActions sx={{ width: '150px' }}>
                                            <Button autoFocus onClick={handleCloseWithSave}>
                                                Save changes
                                            </Button>
                                        </DialogActions>
                                    </BootstrapDialog>
                                </div>
                            </div>
                        </React.Fragment>
                      
                        </div>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            <Link className='contain' to='/home'>
                                Cleaning Ladies
                            </Link>

                            {currentClient.role === 'manager' &&
                                <Link style={{ marginLeft: '0.5cm' }} className='contain' to='/HomeAdmin'>
                                    Clients
                                </Link>
                            }
                        </Typography>
                      
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleChangeSearch}
                            />
                        </Search>
                        <FormControl sx={StyledSelect} size="small">
                            <InputLabel id="demo-select-small-label" sx={{ color: "white" }}>Sort By</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="filterBy"
                                value={filter}
                                label="Sort By"
                                sx={{ color: "white" }}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="city">city</MenuItem>
                                <MenuItem value="name">name</MenuItem>
                            </Select>
                        </FormControl>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </Box>
        </div>
    )
}

export default Navbar