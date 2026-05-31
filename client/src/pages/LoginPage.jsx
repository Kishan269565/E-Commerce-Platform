import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [form, setForm]   = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login }         = useAuth();
  const navigate          = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data);
      toast.success(`Welcome back, ${data.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={wrapStyle}>
      <div style={boxStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input style={inputStyle} type="email"    placeholder="Email"    value={form.email}    onChange={e => setForm({...form, email: e.target.value})}    required />
          <input style={inputStyle} type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          <button type="submit" style={submitStyle} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
          No account? <Link to="/register" style={{ color: '#e94560' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}

const wrapStyle   = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' };
const boxStyle    = { background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' };
const inputStyle  = { display: 'block', width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box' };
const submitStyle = { width: '100%', padding: '12px', background: '#e94560', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 600 };