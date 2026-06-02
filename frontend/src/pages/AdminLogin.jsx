import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [remaining, setRemaining] = useState(3);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('th_admin_token');
    if (token) navigate('/admin/dashboard');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (blocked) return;
    setError(''); setLoading(true);
    try {
      const data = await api.post('/admin/login', { username, password });
      localStorage.setItem('th_admin_token', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      if (err.message.includes('blocked') || err.message.includes('24 hours')) {
        setBlocked(true);
        setError(err.message);
      } else {
        setError('Invalid credentials');
        if (err.message.includes('remaining')) {
          const match = err.message.match(/\d+/);
          if (match) setRemaining(+match[0]);
        } else {
          setRemaining(r => Math.max(0, r - 1));
        }
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-500 mb-4">
            <span className="text-white font-display font-bold text-2xl">T</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Admin Access</h1>
          <p className="text-navy-300 text-sm mt-1">ToolHive Control Panel</p>
        </div>

        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-4">
          {error && (
            <div className="bg-red-900/30 border border-red-800 rounded-xl p-3 text-sm text-red-400">
              {error}
              {!blocked && remaining > 0 && remaining < 3 && (
                <p className="mt-1 text-xs text-red-500">{remaining} attempt{remaining !== 1 ? 's' : ''} remaining before 24-hour block</p>
              )}
            </div>
          )}

          {blocked ? (
            <div className="text-center py-4">
              <p className="text-4xl mb-3">🔒</p>
              <p className="text-sm text-navy-300">Access blocked for 24 hours due to too many failed attempts.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy-400 mb-1.5 uppercase tracking-wide">Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                  className="w-full bg-navy-800 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400"
                  placeholder="Admin username" required autoComplete="off" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy-400 mb-1.5 uppercase tracking-wide">Password</label>
                <div className="relative">
                  <input type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full bg-navy-800 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 pr-10"
                    placeholder="Admin password" required />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-2.5 text-navy-400 hover:text-navy-200">
                    {show ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-gold-500 hover:bg-gold-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-all disabled:opacity-50">
                {loading ? 'Verifying…' : 'Access Admin Panel'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
