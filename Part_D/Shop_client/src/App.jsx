import './App.css'
import ProviderList from './store/features/Provider/ProviderList'
import SignUp from './components/SingUp/SignUp'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OrderList from './store/features/Order/OrderList'
import ProvidersLogin from './Components/Login/Login'
import Home from './components/Home/Home'
import ProductList from './store/features/Product/ProductList';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<ProvidersLogin/>} />
          <Route path='signup' element={<SignUp />} />
          <Route path='providers' element={<ProviderList></ProviderList>} />
          <Route path='products' element={<ProductList/>} />
          <Route path='orders/:statusFilter' element={<OrderList></OrderList>}></Route>
          <Route path='home' element={<Home></Home>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
