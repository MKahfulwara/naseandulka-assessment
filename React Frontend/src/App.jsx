import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import AddWarehouse from './pages/AddWarehouse';
import AddSupplier from './pages/AddSupplier';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/addWarehouse' element={<AddWarehouse />} />
        <Route path='/addSupplier' element={<AddSupplier />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
