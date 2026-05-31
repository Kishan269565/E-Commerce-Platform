import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`).then(r => setProduct(r.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="product-page">
      <img src={product.image} alt={product.name} />
      <div className="details">
        <h1>{product.name}</h1>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <p>⭐ {product.rating.toFixed(1)} ({product.numReviews} reviews)</p>
        <p>In stock: {product.stock}</p>
        <button onClick={handleAdd} disabled={product.stock === 0}>
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}