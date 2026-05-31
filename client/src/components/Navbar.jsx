import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <nav style={{
      background: '#1a1a2e', color: '#fff', padding: '0 40px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '60px', position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link to="/" style={{ color: '#e94560', fontWeight: 700, fontSize: '22px', textDecoration: 'none' }}>
        🛒 ShopFlow
      </Link>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/"        style={linkStyle}>Home</Link>
        <Link to="/cart"    style={linkStyle}>
          Cart {totalItems > 0 && (
            <span style={badgeStyle}>{totalItems}</span>
          )}
        </Link>
        {user ? (
          <>
            <span style={{ color: '#aaa', fontSize: '14px' }}>Hi, {user.name}</span>
            <button onClick={logout} style={btnStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"    style={linkStyle}>Login</Link>
            <Link to="/register" style={{ ...linkStyle, background: '#e94560', padding: '6px 14px', borderRadius: '6px' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const linkStyle = { color: '#fff', textDecoration: 'none', fontSize: '15px' };
const badgeStyle = {
  background: '#e94560', color: '#fff', borderRadius: '50%',
  padding: '2px 7px', fontSize: '11px', marginLeft: '4px',
};
const btnStyle = {
  background: 'transparent', color: '#aaa', border: '1px solid #aaa',
  borderRadius: '6px', padding: '4px 12px', cursor: 'pointer',
};