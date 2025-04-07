
import { store } from '../../store/app/store'
import { Box, ThemeProvider } from '@mui/material';
import Order from '../../store/features/Order/Order';
import HubIcon from '@mui/icons-material/Hub';
import './FinalOrder.scss'
import { useNavigate } from 'react-router-dom';

const FinalOrder = () => {
  let order = store.getState().order.currentOrder
  let nav = useNavigate()
  const moveToHome = () => {
    nav("/home")
  }
  return (
    <div className='final'>
      <h1>Your order has been successfully placed.</h1>
      <Order order={order} />
      <h2>Thank you for visiting us</h2>

      <ThemeProvider
        theme={{
          palette: {
            primary: {
              main: '#007FFF',
              dark: '#0066CC',
            },
          },
        }}
      >
        <Box
          onClick={moveToHome}
          sx={{
            width: 100,
            display: 'flex',
            justifyContent: 'center',
            height: 50,
            borderRadius: 1,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        ><HubIcon

          sx={{ color: 'white', fontSize: 30, }}></HubIcon></Box>
      </ThemeProvider>


    </div>)
}
export default FinalOrder