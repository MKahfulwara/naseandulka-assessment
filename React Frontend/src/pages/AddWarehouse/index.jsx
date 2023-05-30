import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../apis';

// const navigate = useNavigate();

const AddWarehouse = () => {
  const [supplierId, setSupplierId] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

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

    fetchSuppliers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!supplierId) {
      alert('Please select a supplier');
    } else if (!name) {
      alert('Please enter a name');
    } else if (!address) {
      alert('Please enter an address');
    } else {
      const payload = {
        supplier_id: supplierId,
        name,
        address,
      };

      API.post('/addwarehouse', payload)
        .then((response) => {
          console.log('Warehouse added successfully:', response.data);
          setSupplierId('');
          setName('');
          setAddress('');

        })
        .catch((error) => {
          console.error('Error adding warehouse:', error);
        });

    }
    navigate('/');
   
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2 className='login-form__title'>Add Warehouse</h2>
        <div className='login-form__group'>
          <label htmlFor='supplier' className='login-form__label'>
            Supplier
          </label>
          <select
            id='supplier'
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
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
          <label htmlFor='address' className='login-form__label'>
            Address
          </label>
          <input
            type='text'
            id='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='login-form__input'
          />
        </div>
        <button type='submit' className='login-form__button'>
          Add Warehouse
        </button>
        <Link to='/' className='link'>
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default AddWarehouse;
