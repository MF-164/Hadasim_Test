import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { store } from "../../store/app/store";
import './Navbar.scss';

const Navbar = () => {
    const currentProvider = store.getState().provider.currentProvider;
    console.log({ currentProvider });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

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

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

    return (
        <div className='navbar'>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        {/* <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            <Link className='contain' to={`/orders/all`}>
                                Order
                            </Link>
                            {currentProvider.username === 'Admin' && currentProvider.password === 'Admin123' && (
                                <Link style={{ marginLeft: '0.5cm' }} className='contain' to='providers'>
                                    Providers
                                </Link>
                            )}

                            {(currentProvider.username !== 'Admin' || currentProvider.password !== 'Admin123') && (
                                <>
                                    <Link style={{ marginLeft: '0.5cm' }} className='contain' to={`/orders/all`}>
                                        My Orders
                                    </Link>
                                    <Link style={{ marginLeft: '0.5cm' }} className='contain' to={`/products/${currentProvider.id}`}>
                                        My Products
                                    </Link>
                                </>
                            )}
                        </Typography> */}
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                                <Link className='contain' to={`/orders/all`}>
                                    Order
                                </Link>
                                {currentProvider.username === 'Admin' && currentProvider.password === 'Admin123' && (
                                    <>
                                        <Link style={{ marginLeft: '0.5cm' }} className='contain' to='/providers'>
                                            Providers
                                        </Link>
                                    </>
                                )}
                                <Link style={{ marginLeft: '0.5cm' }} className='contain' to={`/products`}>
                                    Products
                                </Link>
                            </Typography>
                        </Box>

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

export default Navbar;
