import { useEffect, useState } from 'react';
import API from '../../apis';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/getallproducts')
      .then((response) => {
        console.log(response);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <h2 className='title'>Products</h2>

      {products.map((product) => (
        <div key={product.id} className='product-card'>
          <h3 className='product-card__name'>{product.name}</h3>
          <p className='product-card__price'>Price: ${product.price}</p>
          <p className='product-card__supplier'>
            Supplier: {product.supplier_name}
          </p>
          <p className='product-card__warehouse'>
            Warehouse: {product.warehouse_name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Products;
