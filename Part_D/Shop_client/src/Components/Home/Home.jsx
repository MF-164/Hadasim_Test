import './Home.scss';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import ButtomBack from '../ButtonBack/ButtonBack';
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import ProviderList from '../../store/features/Provider/ProviderList';
import ProductList from '../../store/features/Product/ProductList';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Home = () => {
  const currentProvider = useSelector(state => state.provider.currentProvider);

  return (
    <div className='home'>
      <React.Fragment>
        <CssBaseline />
        <ElevationScroll>
          <AppBar>
            <Navbar />
          </AppBar>
        </ElevationScroll>
        <Toolbar />
        <Container>
          <Box sx={{ my: 2 }}>
              {currentProvider.username === 'Admin' && currentProvider.password === 'Admin123' ?
                <ProviderList></ProviderList> :
                <ProductList providerId={currentProvider.id}></ProductList>}
          </Box>
        </Container>
      </React.Fragment>
      <ButtomBack navigate={"/"} />
    </div>
  );
}

export default Home;
