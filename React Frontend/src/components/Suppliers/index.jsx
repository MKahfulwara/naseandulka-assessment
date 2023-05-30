import { useEffect, useState } from 'react';
import API from '../../apis';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Fetch suppliers from the API
    API.get('/getsuppliers')
      .then((response) => {
        // Set the suppliers data in state
        setSuppliers(response.data.data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching suppliers:', error);
        // Perform any error handling or display error message to the user
      });
  }, []);

  return (
    <div>
      <h2 className='title'>Suppliers</h2>
      {/* Render the suppliers data */}
      {suppliers.map((supplier) => (
        <div key={supplier.id} className='supplier-card'>
          <h3 className='supplier-card__name'>{supplier.name}</h3>
          <p className='supplier-card__address'>Address: {supplier.address}</p>
        </div>
      ))}
    </div>
  );
};

export default Suppliers;
