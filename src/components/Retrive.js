import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Retrieve() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => {
        const foundProduct = data.find(item => item.id === parseInt(id));
        setProduct(foundProduct);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleImageClick = () => {
    navigate(`/products/${id}`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <img src={product.image} alt={product.name} onClick={handleImageClick} />
    </div>
  );
}

export default Retrieve;
