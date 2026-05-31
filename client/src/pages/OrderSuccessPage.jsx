import { Link } from 'react-router-dom';

export default function OrderSuccessPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <div style={{ fontSize: '64px' }}>🎉</div>
      <h1 style={{ color: '#2ecc71', marginBottom: '12px' }}>Order Placed!</h1>
      <p style={{ color: '#888', marginBottom: '30px' }}>Thank you for your purchase. Your order is being processed.</p>
      <Link to="/" style={{ background: '#e94560', color: '#fff', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
        Continue Shopping
      </Link>
    </div>
  );
}