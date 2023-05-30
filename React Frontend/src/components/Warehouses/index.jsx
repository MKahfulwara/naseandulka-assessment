import { useEffect, useState } from 'react';
import API from '../../apis';

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    API.get('/getallwarehouses')
      .then((response) => {
        setWarehouses(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching warehouses:', error);
      });
  }, []);

  return (
    <div>
      <h2 className='title'>Warehouses</h2>
      {warehouses.map((warehouse) => (
        <div key={warehouse.id} className='warehouse-card'>
          <h3 className='warehouse-card__name'>{warehouse.name}</h3>
          <p className='warehouse-card__address'>
            Address: {warehouse.address}
          </p>
          <p className='warehouse-card__supplier'>
            Supplier: {warehouse.supplier_name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Warehouses;
