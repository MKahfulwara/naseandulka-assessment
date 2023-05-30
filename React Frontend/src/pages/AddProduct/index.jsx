import { useState, useEffect } from 'react';
import API from '../../apis';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState('');
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await API.get('/getsuppliers');
        setSuppliers(response.data.data);
      } catch (error) {
        console.log('Failed to fetch suppliers:', error);
      }
    };

    const fetchWarehouses = async () => {
      try {
        const response = await API.get('/getallwarehouses');
        setWarehouses(response.data.data);
      } catch (error) {
        console.log('Failed to fetch warehouses:', error);
      }
    };

    fetchSuppliers();
    fetchWarehouses();
  }, []);

  const handleSupplierChange = (e) => {
    setSelectedSupplierId(e.target.value);
  };

  const handleWarehouseChange = (e) => {
    setSelectedWarehouseId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert('Please enter product name');
    } else if (!price) {
      alert('Please enter product price');
    } else if (!selectedSupplierId) {
      alert('Please select a supplier');
    } else if (!selectedWarehouseId) {
      alert('Please select a warehouse');
    } else {
      const product = {
        name,
        price,
        supplier_id: selectedSupplierId,
        warehouse_id: selectedWarehouseId,
      };

      try {
        const response = await API.post('/addproduct', product);
        console.log('Product added:', response.data);

        setName('');
        setPrice('');
        setSelectedSupplierId('');
        setSelectedWarehouseId('');
        navigate('/');

      } catch (error) {
        console.log('Failed to add product:', error);
      }
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2 className='login-form__title'>Add Product</h2>
        <div className='login-form__group'>
          <label htmlFor='name' className='login-form__label'>
            Name
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='login-form__input'
          />
        </div>
        <div className='login-form__group'>
          <label htmlFor='price' className='login-form__label'>
            Price
          </label>
          <input
            type='number'
            id='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='login-form__input'
          />
        </div>
        <div className='login-form__group'>
          <label htmlFor='supplier' className='login-form__label'>
            Supplier
          </label>
          <select
            id='supplier'
            value={selectedSupplierId}
            onChange={handleSupplierChange}
            className='login-form__input'
          >
            <option value=''>Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <div className='login-form__group'>
          <label htmlFor='warehouse' className='login-form__label'>
            Warehouse
          </label>
          <select
            id='warehouse'
            value={selectedWarehouseId}
            onChange={handleWarehouseChange}
            className='login-form__input'
          >
            <option value=''>Select Warehouse</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        </div>
        <button type='submit' className='login-form__button'>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
