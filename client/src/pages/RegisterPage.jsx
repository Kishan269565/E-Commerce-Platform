import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      login(data);
      toast.success(`Welcome, ${data.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div style={wrapStyle}>
      <div style={boxStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input style={inputStyle} type="text"     placeholder="Full Name" value={form.name}     onChange={e => setForm({...form, name: e.target.value})}     required />
          <input style={inputStyle} type="email"    placeholder="Email"     value={form.email}    onChange={e => setForm({...form, email: e.target.value})}    required />
          <input style={inputStyle} type="password" placeholder="Password"  value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          <button type="submit" style={submitStyle} disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
          Have an account? <Link to="/login" style={{ color: '#e94560' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const wrapStyle   = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' };
const boxStyle    = { background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' };
const inputStyle  = { display: 'block', width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box' };
const submitStyle = { width: '100%', padding: '12px', background: '#e94560', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 600 };