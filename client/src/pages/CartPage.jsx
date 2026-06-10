import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f7f8fc',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: 0,
  },
  badge: {
    background: '#e94560',
    color: '#fff',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '14px',
    fontWeight: '600',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '24px',
    alignItems: 'start',
  },
  itemsPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    transition: 'box-shadow 0.2s',
  },
  img: {
    width: '90px',
    height: '90px',
    objectFit: 'cover',
    borderRadius: '12px',
    flexShrink: 0,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a2e',
    margin: '0 0 4px',
  },
  itemCategory: {
    fontSize: '13px',
    color: '#999',
    margin: '0 0 12px',
  },
  itemPrice: {
    fontSize: '15px',
    color: '#555',
  },
  qtyRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    background: '#f7f8fc',
    borderRadius: '10px',
    overflow: 'hidden',
    width: 'fit-content',
  },
  qtyBtn: {
    background: 'none',
    border: 'none',
    width: '36px',
    height: '36px',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#1a1a2e',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyNum: {
    width: '36px',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '15px',
    color: '#1a1a2e',
  },
  itemTotal: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a2e',
    minWidth: '80px',
    textAlign: 'right',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#ccc',
    cursor: 'pointer',
    fontSize: '20px',
    padding: '4px',
    borderRadius: '6px',
    transition: 'color 0.2s',
    lineHeight: 1,
  },
  // Summary panel
  summary: {
    background: '#fff',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    position: 'sticky',
    top: '80px',
  },
  summaryTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: '0 0 24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f0f0f0',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '14px',
    fontSize: '15px',
    color: '#666',
  },
  summaryDivider: {
    border: 'none',
    borderTop: '1px solid #f0f0f0',
    margin: '16px 0',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '24px',
  },
  checkoutBtn: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #e94560 0%, #c0392b 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(233,69,96,0.35)',
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
  continueLink: {
    display: 'block',
    textAlign: 'center',
    marginTop: '14px',
    color: '#999',
    fontSize: '14px',
    textDecoration: 'none',
  },
  promoRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
  },
  promoInput: {
    flex: 1,
    padding: '10px 14px',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    color: '#333',
  },
  promoBtn: {
    padding: '10px 16px',
    background: '#1a1a2e',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  emptyWrap: {
    textAlign: 'center',
    padding: '80px 20px',
  },
  emptyIcon: {
    fontSize: '72px',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '8px',
  },
  emptyText: {
    color: '#999',
    marginBottom: '28px',
    fontSize: '15px',
  },
  shopBtn: {
    display: 'inline-block',
    padding: '14px 32px',
    background: '#e94560',
    color: '#fff',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '15px',
  },
};

export default function CartPage() {
  const { cart, removeItem, updateQty, total } = useCart();
  const { user }  = useAuth();
  const navigate  = useNavigate();
  const itemCount = cart.reduce((acc, i) => acc + i.quantity, 0);
  const shipping  = total > 50 ? 0 : 4.99;
  const tax       = +(total * 0.08).toFixed(2);
  const grandTotal = +(total + shipping + tax).toFixed(2);

  if (cart.length === 0) return (
    <div style={styles.page}>
      <div style={styles.emptyWrap}>
        <div style={styles.emptyIcon}>🛒</div>
        <h2 style={styles.emptyTitle}>Your cart is empty</h2>
        <p style={styles.emptyText}>Looks like you haven't added anything yet.</p>
        <Link to="/" style={styles.shopBtn}>Start Shopping</Link>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Your Cart</h1>
          <span style={styles.badge}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        </div>

        <div style={styles.layout}>
          {/* Items */}
          <div style={styles.itemsPanel}>
            {cart.map(item => (
              <div key={item._id} style={styles.card}>
                <img src={item.image} alt={item.name} style={styles.img} />
                <div style={styles.itemInfo}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemCategory}>{item.category}</p>
                  <p style={styles.itemPrice}>${item.price.toFixed(2)} each</p>
                  <div style={styles.qtyRow}>
                    <button style={styles.qtyBtn} onClick={() => updateQty(item._id, Math.max(1, item.quantity - 1))}>−</button>
                    <span style={styles.qtyNum}>{item.quantity}</span>
                    <button style={styles.qtyBtn} onClick={() => updateQty(item._id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <span style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  style={styles.removeBtn}
                  onClick={() => removeItem(item._id)}
                  onMouseEnter={e => e.target.style.color = '#e94560'}
                  onMouseLeave={e => e.target.style.color = '#ccc'}
                >✕</button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>

            <div style={styles.promoRow}>
              <input style={styles.promoInput} placeholder="Promo code" />
              <button style={styles.promoBtn}>Apply</button>
            </div>

            <div style={styles.summaryRow}>
              <span>Subtotal ({itemCount} items)</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span style={{ color: shipping === 0 ? '#2ecc71' : '#333' }}>
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div style={styles.summaryRow}>
              <span>Tax (8%)</span>
              <span>${tax}</span>
            </div>
            {shipping === 0 && (
              <div style={{ background: '#f0fff4', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#2ecc71', marginBottom: '8px' }}>
                🎉 You qualify for free shipping!
              </div>
            )}
            {shipping > 0 && (
              <div style={{ background: '#fff8f0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#e67e22', marginBottom: '8px' }}>
                Add ${(50 - total).toFixed(2)} more for free shipping
              </div>
            )}
            <hr style={styles.summaryDivider} />
            <div style={styles.summaryTotal}>
              <span>Total</span>
              <span>${grandTotal}</span>
            </div>
            <button
              style={styles.checkoutBtn}
              onClick={() => user ? navigate('/checkout') : navigate('/login')}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 6px 20px rgba(233,69,96,0.45)'; }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px rgba(233,69,96,0.35)'; }}
            >
              {user ? '🔒 Proceed to Checkout' : '🔑 Login to Checkout'}
            </button>
            <Link to="/" style={styles.continueLink}>← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
