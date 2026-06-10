import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

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
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: '0 0 6px',
  },
  subtitle: {
    color: '#999',
    fontSize: '14px',
    margin: 0,
  },
  steps: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    marginBottom: '32px',
  },
  step: (active, done) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: active ? '700' : '500',
    color: done ? '#2ecc71' : active ? '#e94560' : '#bbb',
  }),
  stepNum: (active, done) => ({
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: done ? '#2ecc71' : active ? '#e94560' : '#e0e0e0',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '700',
    flexShrink: 0,
  }),
  stepLine: {
    flex: 1,
    height: '2px',
    background: '#e0e0e0',
    margin: '0 12px',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '24px',
    alignItems: 'start',
  },
  formPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: '0 0 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  cardIcon: {
    fontSize: '20px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
  },
  fieldWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '14px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '12px 16px',
    border: '1.5px solid #e8e8e8',
    borderRadius: '10px',
    fontSize: '15px',
    color: '#1a1a2e',
    outline: 'none',
    transition: 'border-color 0.2s',
    background: '#fafafa',
    width: '100%',
    boxSizing: 'border-box',
  },
  // Payment card visual
  cardVisual: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  cardChip: {
    width: '42px',
    height: '32px',
    background: 'linear-gradient(135deg, #d4af37, #f0e68c)',
    borderRadius: '6px',
    marginBottom: '20px',
  },
  cardNumber: {
    fontSize: '20px',
    letterSpacing: '4px',
    marginBottom: '20px',
    fontFamily: 'monospace',
  },
  cardBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    opacity: 0.8,
  },
  stripeLogos: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '20px',
  },
  cardBrand: (active) => ({
    padding: '6px 14px',
    borderRadius: '8px',
    border: `2px solid ${active ? '#e94560' : '#e8e8e8'}`,
    fontSize: '13px',
    fontWeight: '600',
    color: active ? '#e94560' : '#aaa',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }),
  // Order summary
  summary: {
    background: '#fff',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    position: 'sticky',
    top: '80px',
  },
  summaryTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: '0 0 20px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f0f0f0',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
    gap: '12px',
  },
  summaryItemImg: {
    width: '44px',
    height: '44px',
    objectFit: 'cover',
    borderRadius: '8px',
    flexShrink: 0,
  },
  summaryItemName: {
    fontSize: '14px',
    color: '#333',
    flex: 1,
  },
  summaryItemPrice: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a2e',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #f0f0f0',
    margin: '16px 0',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '14px',
    color: '#666',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a2e',
    marginTop: '4px',
  },
  payBtn: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #e94560 0%, #c0392b 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '20px',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(233,69,96,0.35)',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  secure: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    marginTop: '12px',
    fontSize: '12px',
    color: '#aaa',
  },
};

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cardDisplay, setCardDisplay] = useState('•••• •••• •••• ••••');
  const [cardName, setCardName]       = useState('YOUR NAME');
  const [cardExpiry, setCardExpiry]   = useState('MM/YY');

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zip: '', country: '',
    cardNumber: '', expiry: '', cvc: '', nameOnCard: '',
  });

  const shipping   = total > 50 ? 0 : 4.99;
  const tax        = +(total * 0.08).toFixed(2);
  const grandTotal = +(total + shipping + tax).toFixed(2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '').slice(0, 16);
      const grouped = cleaned.replace(/(.{4})/g, '$1 ').trim();
      setCardDisplay(grouped || '•••• •••• •••• ••••');
    }
    if (name === 'nameOnCard') setCardName(value.toUpperCase() || 'YOUR NAME');
    if (name === 'expiry')     setCardExpiry(value || 'MM/YY');
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/orders', {
        items: cart.map(i => ({
          product: i._id, name: i.name,
          price: i.price, quantity: i.quantity, image: i.image,
        })),
        shippingAddress: {
          street: form.address, city: form.city,
          zip: form.zip, country: form.country,
        },
        totalPrice: grandTotal,
        paymentResult: { id: 'demo_' + Date.now(), status: 'paid', email: form.email },
      });
      clearCart();
      navigate('/order-success');
    } catch (err) {
      alert('Payment failed: ' + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Checkout</h1>
          <p style={styles.subtitle}>Complete your purchase securely</p>
        </div>

        {/* Steps */}
        <div style={styles.steps}>
          <div style={styles.step(false, true)}>
            <div style={styles.stepNum(false, true)}>✓</div>
            Cart
          </div>
          <div style={styles.stepLine} />
          <div style={styles.step(true, false)}>
            <div style={styles.stepNum(true, false)}>2</div>
            Checkout
          </div>
          <div style={styles.stepLine} />
          <div style={styles.step(false, false)}>
            <div style={styles.stepNum(false, false)}>3</div>
            Confirmation
          </div>
        </div>

        <form onSubmit={handlePay}>
          <div style={styles.layout}>
            <div style={styles.formPanel}>

              {/* Shipping */}
              <div style={styles.card}>
                <h2 style={styles.cardTitle}><span style={styles.cardIcon}>📦</span> Shipping Information</h2>
                <div style={styles.row}>
                  <div style={styles.fieldWrap}>
                    <label style={styles.label}>First Name</label>
                    <input style={styles.input} name="firstName" placeholder="Kishan" value={form.firstName} onChange={handleChange}
                      onFocus={e => e.target.style.borderColor = '#e94560'}
                      onBlur={e => e.target.style.borderColor = '#e8e8e8'} required />
                  </div>
                  <div style={styles.fieldWrap}>
                    <label style={styles.label}>Last Name</label>
                    <input style={styles.input} name="lastName" placeholder="Patel" value={form.lastName} onChange={handleChange}
                      onFocus={e => e.target.style.borderColor = '#e94560'}
                      onBlur={e => e.target.style.borderColor = '#e8e8e8'} required />
                  </div>
                </div>
                <div style={styles.row}>
                  <div style={styles.fieldWrap}>
                    <label style={styles.label}>Email</label>
                    <input style={styles.input} name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange}
                      onFocus={e => e.target.style.borderColor = '#e94560'}
                      onBlur={e => e.target.style.borderColor = '#e8e8e8'} required />
                  </div>
                  <div style={styles.fieldWrap}>
                    <label style={styles.label}>Phone</label>
                    <input style={styles.input} name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange}
                      onFocus={e => e.target.style.borderColor = '#e94560'}
                      onBlur={e => e.target.style.borderColor = '#e8e8e8'} />
                  </div>
                </div>
                <div style={styles.fieldWrap}>
                  <label style={styles.label}>Street Address</label>
                  <input style={styles.input} name="address" placeholder="123 Main Street" value={form.address} onChange={handleChange}
                    onFocus={e => e.target.style.borderColor = '#e94560'}
                    onBlur={e => e.target.style.borderColor = '#e8e8e8'} required />
                </div>
                <div style={styles.row}>
                  <div style={styles.fieldWrap}>
                    <label style={styles.label}>City</label>
                    <input style={styles.input} name="city" placeholder="Mumbai" value={form.city} onChange={handleChange}
                      onFocus={e => e.target.style.borderColor = '#e94560'}
                      onBlur={e => e.target.style.borderColor = '#e8e8e8'} required />
                  </div>
                  <div style={styles.fieldWrap}>
                    <label style={styles.label}>ZIP Code</label>
                    <input style={styles.input} name="zip" placeholder="400001" value={form.zip} onChange={handleChange}
                      onFocus={e => e.target.style.borderColor = '#e94560'}
                      onBlur={e => e.target.style.borderColor = '#e8e8e8'} required />
                  </div>
                </div>
                <div style={styles.fieldWrap}>
                  <label style={styles.label}>Country</label>
                  <input style={styles.input} name="country" placeholder="India" value={form.country} onChange={handleChange}
                    onFocus={e => e.target.style.borderColor = '#e94560'}
                    onBlur={e => e.target.style.borderColor = '#e8e8e8'} required />
                </div>
              </div>

              {/* Payment */}
              <div style={styles.card}>
                <h2 style={styles.cardTitle}><span style={styles.cardIcon}>💳</span> Payment Details</h2>

                {/* Card Visual */}
                <div style={styles.cardVisual}>
                  <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                  <div style={{ position: 'absolute', top: '30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
                  <div style={styles.cardChip} />
                  <div style={styles.cardNumber}>{cardDisplay}</div>
                  <div style={styles.cardBottom}>
                    <div>
                      <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '2px' }}>CARD HOLDER</div>
                      <div style={{ fontWeight: '600' }}>{cardName}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '2px' }}>EXPIRES</div>
                      <div style={{ fontWeight: '600' }}>{cardExpiry}</div>
                    </div>
                    <div style={{ fontSize: '22px', opacity: 0.8 }}>💳</div>
                  </div>
                </div>

                <div style={styles.stripeLogos}>
                  <span style={styles.cardBrand(true)}>VISA</span>
                  <span style={styles.cardBrand(false)}>Mastercard</span>
                  <span style={styles.cardBrand(false)}>Amex</span>
                </div>

                <div style={styles.fieldWrap}>
                  <label style={styles.label}>Card Number</label>
                  <input style={styles.input} name="cardNumber" placeholder="4242 4242 4242 4242" maxLength="19" value={form.cardNumber} onChange={handleChange}
                    onFocus={e => e.target.style.borderColor = '#e94560'}
                    onBlur={e => e.target.style.borderColor = '#e8e8e8'} required />
                </div>
                <div style={styles.fieldWrap}>
                  <label style={styles.label}>Name on Card</label>
                  <input style={styles.input} name="nameOnCard" placeholder="KISHAN PATEL" value={form.nameOnCard} onChange={handleChange}
                    onFocus={e => e.target.style.borderColor = '#e94560'}
                    onBlur={e => e.target.style.borderColor = '#e8e8e8'} required />
                </div>
                <div style={styles.row}>
                  <div style={styles.fieldWrap}>
                    <label style={styles.label}>Expiry Date</label>
                    <input style={styles.input} name="expiry" placeholder="MM/YY" maxLength="5" value={form.expiry} onChange={handleChange}
                      onFocus={e => e.target.style.borderColor = '#e94560'}
                      onBlur={e => e.target.style.borderColor = '#e8e8e8'} required />
                  </div>
                  <div style={styles.fieldWrap}>
                    <label style={styles.label}>CVC</label>
                    <input style={styles.input} name="cvc" placeholder="123" maxLength="4" value={form.cvc} onChange={handleChange}
                      onFocus={e => e.target.style.borderColor = '#e94560'}
                      onBlur={e => e.target.style.borderColor = '#e8e8e8'} required />
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div style={styles.summary}>
              <h2 style={styles.summaryTitle}>Order Summary ({cart.length} items)</h2>

              {cart.map(item => (
                <div key={item._id} style={styles.summaryItem}>
                  <img src={item.image} alt={item.name} style={styles.summaryItemImg} />
                  <span style={styles.summaryItemName}>
                    {item.name} <span style={{ color: '#aaa' }}>×{item.quantity}</span>
                  </span>
                  <span style={styles.summaryItemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <hr style={styles.divider} />

              <div style={styles.summaryRow}>
                <span>Subtotal</span>
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

              <hr style={styles.divider} />

              <div style={styles.summaryTotal}>
                <span>Total</span>
                <span style={{ color: '#e94560' }}>${grandTotal}</span>
              </div>

              <button
                type="submit"
                style={styles.payBtn}
                disabled={loading}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {loading ? '⏳ Processing...' : `🔒 Pay $${grandTotal}`}
              </button>

              <div style={styles.secure}>
                🔐 Secured by SSL encryption
              </div>

              <div style={{ marginTop: '16px', background: '#f7f8fc', borderRadius: '10px', padding: '12px', fontSize: '12px', color: '#aaa', textAlign: 'center' }}>
                Test card: <strong style={{ color: '#555' }}>4242 4242 4242 4242</strong><br />
                Expiry: 12/26 · CVC: 123
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
