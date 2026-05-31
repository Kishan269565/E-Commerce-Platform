import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const { cart, removeItem, updateQty, total } = useCart();
  const { user }    = useAuth();
  const navigate    = useNavigate();

  if (cart.length === 0) return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h2>Your cart is empty</h2>
      <Link to="/" style={{ color: '#e94560' }}>Continue Shopping</Link>
    </div>
  );

  return (
    <div style={{ padding: '30px 0' }}>
      <h1 style={{ marginBottom: '24px' }}>Your Cart</h1>
      {cart.map(item => (
        <div key={item._id} style={rowStyle}>
          <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
          <div style={{ flex: 1, marginLeft: '16px' }}>
            <h3 style={{ margin: '0 0 4px' }}>{item.name}</h3>
            <p style={{ color: '#888', margin: 0 }}>${item.price.toFixed(2)} each</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => updateQty(item._id, Math.max(1, item.quantity - 1))} style={qtyBtn}>−</button>
            <span style={{ minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
            <button onClick={() => updateQty(item._id, item.quantity + 1)} style={qtyBtn}>+</button>
          </div>
          <span style={{ fontWeight: 700, minWidth: '80px', textAlign: 'right' }}>
            ${(item.price * item.quantity).toFixed(2)}
          </span>
          <button onClick={() => removeItem(item._id)} style={removeBtn}>✕</button>
        </div>
      ))}
      <div style={{ textAlign: 'right', marginTop: '24px' }}>
        <h2>Total: ${total.toFixed(2)}</h2>
        <button
          onClick={() => user ? navigate('/checkout') : navigate('/login')}
          style={{ background: '#e94560', color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 32px', fontSize: '16px', cursor: 'pointer', fontWeight: 600 }}
        >
          {user ? 'Proceed to Checkout' : 'Login to Checkout'}
        </button>
      </div>
    </div>
  );
}

const rowStyle    = { display: 'flex', alignItems: 'center', gap: '16px', background: '#fff', padding: '16px', borderRadius: '10px', marginBottom: '12px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' };
const qtyBtn      = { background: '#f0f0f0', border: 'none', borderRadius: '6px', width: '32px', height: '32px', cursor: 'pointer', fontSize: '18px' };
const removeBtn   = { background: 'none', border: 'none', color: '#e94560', cursor: 'pointer', fontSize: '18px' };