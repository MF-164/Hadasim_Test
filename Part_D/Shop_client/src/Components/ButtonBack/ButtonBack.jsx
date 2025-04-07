import { useNavigate } from 'react-router-dom';
import './ButtonBack.scss'
import Button from '@mui/material/Button';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';


const ButtomBack = ({ navigate }) => {
const nav=useNavigate()
const navigateback=()=>{
    nav(navigate)
}

    return (<>
        <div className='but'>
            <Button onClick={navigateback} 
            sx={{ width: 80 }} variant="outlined" startIcon={< ArrowBackOutlinedIcon />}>
                BACK
            </Button>
        </div></>)

}
export default ButtomBack