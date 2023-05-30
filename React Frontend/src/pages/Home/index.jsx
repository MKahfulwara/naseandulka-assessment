import { Link, useNavigate } from 'react-router-dom';
import Products from '../../components/Products';
import Suppliers from '../../components/Suppliers';
import Warehouses from '../../components/Warehouses';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/features/authSlice';

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  return (
    <div>
      {/* Navbar */}
      <nav className='navbar'>
        <div className='navbar__brand'>Assessment</div>
        <div className='navbar__links'>
          <Link to='/addProduct' className='navbar__link'>
            Add Product
          </Link>
          <Link to='/addWarehouse' className='navbar__link'>
            Add Warehouse
          </Link>
          <Link to='/addSupplier' className='navbar__link'>
            Add Supplier
          </Link>
          <p
            to='/addSupplier'
            className='navbar__link'
            style={{ cursor: 'pointer' }}
            onClick={() => {
              dispatch(logout());
              navigate('/login');
            }}
          >
            LogOut
          </p>
        </div>
      </nav>

      {/* Rest of the content */}
      <div className='container'>
        <Products />
        <Suppliers />
        <Warehouses />
      </div>
    </div>
  );
};

export default Home;
