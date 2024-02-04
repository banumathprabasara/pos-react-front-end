
//import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';


import Mainpage from './webpages/Mainpage';
import Stock from './webpages/Stock';
import Cart from './webpages/Cart';
import Items from './webpages/Items';
import Categories from './webpages/Categories';
import Register from './webpages/Register';
import Login from './webpages/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route index element={<Mainpage />} />
          <Route path='/items' element={<Items />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/stock' element={<Stock />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
