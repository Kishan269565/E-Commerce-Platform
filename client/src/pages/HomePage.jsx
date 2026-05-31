import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`/products?search=${search}`)
      .then(r => setProducts(r.data.products))
      .finally(() => setLoading(false));
  }, [search]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '60px' }}>Loading products...</p>;

  return (
    <div style={{ padding: '30px 0' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Our Products</h1>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <input
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={searchStyle}
        />
      </div>
      {products.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No products found. Seed your database!</p>
      ) : (
        <div style={gridStyle}>
          {products.map(p => (
            <div key={p._id} style={cardStyle}>
              <Link to={`/product/${p._id}`}>
                <img src={p.image} alt={p.name} style={imgStyle} />
              </Link>
              <div style={{ padding: '14px' }}>
                <h3 style={{ margin: '0 0 6px', fontSize: '16px' }}>{p.name}</h3>
                <p style={{ color: '#888', fontSize: '13px', margin: '0 0 10px' }}>{p.category}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '18px', color: '#e94560' }}>${p.price.toFixed(2)}</span>
                  <button onClick={() => { addToCart(p); toast.success('Added to cart!'); }} style={addBtnStyle}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' };
const cardStyle = { background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden' };
const imgStyle  = { width: '100%', height: '200px', objectFit: 'cover' };
const addBtnStyle = { background: '#e94560', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 14px', cursor: 'pointer', fontSize: '13px' };
const searchStyle = { padding: '10px 20px', width: '300px', borderRadius: '25px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' };