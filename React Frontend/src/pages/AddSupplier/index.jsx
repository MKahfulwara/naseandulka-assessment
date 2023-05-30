import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import API from '../../apis';

const AddSupplier = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert('Please enter a name');
    } else if (!address) {
      alert('Please enter an address');
    } else {
      const payload = {
        name,
        address,
      };

      API.post('/addsupplier', payload)
        .then((response) => {
          console.log('Supplier added successfully:', response.data);
          setName('');
          setAddress('');
        })
        .catch((error) => {
          console.error('Error adding supplier:', error);
        });
        navigate('/');
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2 className='login-form__title'>Add Supplier</h2>
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
          Add Supplier
        </button>
        <Link to='/' className='link'>
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default AddSupplier;
