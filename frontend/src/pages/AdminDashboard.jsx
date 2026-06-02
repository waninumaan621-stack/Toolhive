import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const StatCard = ({ label, value, sub, accent }) => (
  <div className={`bg-navy-900 border rounded-2xl p-5 ${accent ? 'border-gold-500/50' : 'border-navy-800'}`}>
    <p className="text-xs text-navy-400 uppercase tracking-wide mb-1">{label}</p>
    <p className={`font-display text-3xl font-bold ${accent ? 'text-gold-400' : 'text-white'}`}>{value}</p>
    {sub && <p className="text-xs text-navy-500 mt-1">{sub}</p>}
  </div>
);

const FLAG_API = (code) => `https://flagcdn.com/24x18/${code?.toLowerCase()}.png`;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [settings, setSettings] = useState({});
  const [adCode, setAdCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('th_admin_token');
    if (!token) { navigate('/admin'); return; }
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [s, cfg] = await Promise.all([api.get('/admin/stats'), api.get('/admin/settings')]);
      setStats(s);
      setSettings(cfg);
      setAdCode(cfg.adCode || '');
    } catch (err) {
      if (err.message.includes('Unauthorized')) { localStorage.removeItem('th_admin_token'); navigate('/admin'); }
    } finally { setLoading(false); }
  };

  const logout = () => { localStorage.removeItem('th_admin_token'); navigate('/admin'); };

  const saveSettings = async () => {
    try {
      await api.put('/admin/settings', { ...settings, adCode });
      setSaved(true); setTimeout(() => setSaved(false), 2000);
    } catch { alert('Save failed.'); }
  };

  const TABS = ['overview', 'tools', 'countries', 'charts', 'ads', 'settings'];

  if (loading) return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-navy-950 font-body">
      {/* Admin Navbar */}
      <nav className="bg-navy-900 border-b border-navy-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-display font-bold text-white">ToolHive <span className="text-gold-400 text-sm font-body font-normal">Admin</span></span>
        </div>
        <button onClick={loadData} className="text-navy-400 hover:text-white text-sm mr-4 transition-colors">🔄 Refresh</button>
        <button onClick={logout} className="text-sm text-red-400 hover:text-red-300 transition-colors">Sign out</button>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 p-1 bg-navy-900 rounded-xl border border-navy-800 w-fit">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${tab === t ? 'bg-gold-500 text-white' : 'text-navy-400 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && stats && (
          <div className="space-y-6 animate-fade-up">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Today Visitors" value={stats.todayVisitors} sub={`vs ${stats.yesterdayVisitors} yesterday`} accent />
              <StatCard label="Total Visitors" value={stats.totalVisitors?.toLocaleString()} />
              <StatCard label="Today Tool Uses" value={stats.todayToolUsage} />
              <StatCard label="Total Tool Uses" value={stats.totalToolUsage?.toLocaleString()} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Top tools today */}
              <div className="bg-navy-900 border border-navy-800 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-4">🔥 Top Tools Today</h3>
                {stats.topToolsToday?.length ? stats.topToolsToday.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-navy-800 last:border-0">
                    <span className="text-xs text-navy-500 w-4">{i+1}</span>
                    <span className="text-sm text-white flex-1 capitalize">{t._id?.replace(/-/g, ' ')}</span>
                    <span className="text-xs text-gold-400 font-bold">{t.count}×</span>
                  </div>
                )) : <p className="text-sm text-navy-500">No usage today yet</p>}
              </div>

              {/* Top tools all time */}
              <div className="bg-navy-900 border border-navy-800 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-4">🏆 All-Time Top Tools</h3>
                {stats.topToolsAllTime?.length ? stats.topToolsAllTime.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-navy-800 last:border-0">
                    <span className="text-xs text-navy-500 w-4">{i+1}</span>
                    <span className="text-sm text-white flex-1 capitalize">{t._id?.replace(/-/g, ' ')}</span>
                    <span className="text-xs text-gold-400 font-bold">{t.count}×</span>
                  </div>
                )) : <p className="text-sm text-navy-500">No data yet</p>}
              </div>
            </div>
          </div>
        )}

        {/* Countries */}
        {tab === 'countries' && stats && (
          <div className="bg-navy-900 border border-navy-800 rounded-2xl p-5 animate-fade-up">
            <h3 className="text-sm font-semibold text-white mb-4">🌍 Visitors by Country</h3>
            <div className="space-y-3">
              {stats.byCountry?.length ? stats.byCountry.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={FLAG_API(c.code)} alt={c._id} className="w-6 h-4 object-cover rounded-sm flex-shrink-0" onError={e => e.target.style.display='none'} />
                  <span className="text-sm text-white flex-1">{c._id || 'Unknown'}</span>
                  <div className="w-32 bg-navy-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-gold-500 h-2 rounded-full" style={{ width: Math.min(100, (c.count / stats.byCountry[0].count) * 100) + '%' }} />
                  </div>
                  <span className="text-xs text-gold-400 font-bold w-12 text-right">{c.count}</span>
                </div>
              )) : <p className="text-sm text-navy-500">No visitor data yet</p>}
            </div>
          </div>
        )}

        {/* Charts */}
        {tab === 'charts' && stats && (
          <div className="space-y-5 animate-fade-up">
            <div className="bg-navy-900 border border-navy-800 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4">📈 Last 7 Days Visitors</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={stats.last7Days?.map(d => ({ date: d._id?.slice(5), count: d.count }))}>
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }} />
                  <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-navy-900 border border-navy-800 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4">⏰ Today's Activity by Hour</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={Array.from({length: 24}, (_, h) => ({ hour: h + 'h', count: stats.hourlyToday?.find(x => x._id === h)?.count || 0 }))}>
                  <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }} />
                  <Bar dataKey="count" fill="#f59e0b" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tools usage */}
        {tab === 'tools' && stats && (
          <div className="bg-navy-900 border border-navy-800 rounded-2xl p-5 animate-fade-up">
            <h3 className="text-sm font-semibold text-white mb-4">🛠️ Tool Usage Stats</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.topToolsAllTime?.slice(0,10).map(t => ({ name: t._id?.replace(/-/g, ' ').slice(0,15), count: t.count }))} layout="vertical">
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} width={120} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }} />
                <Bar dataKey="count" fill="#f59e0b" radius={[0,4,4,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Ads */}
        {tab === 'ads' && (
          <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-5 animate-fade-up max-w-2xl">
            <div>
              <h3 className="text-white font-semibold mb-1">💰 AdSense Code</h3>
              <p className="text-navy-400 text-sm">Paste your Google AdSense script tag here. It will automatically appear in all ad slots across the site.</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-400 mb-2 uppercase tracking-wide">AdSense Script Code</label>
              <textarea value={adCode} onChange={e => setAdCode(e.target.value)}
                className="w-full bg-navy-800 border border-navy-700 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50 h-40 resize-none"
                placeholder={'<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>'} />
            </div>
            <div className="bg-navy-800 rounded-xl p-4 space-y-2 text-xs text-navy-300">
              <p className="font-semibold text-navy-200">📋 Ad Placement Locations:</p>
              <p>• Top banner — below navbar on every page</p>
              <p>• Between categories — homepage feed</p>
              <p>• Above tool — when tool page loads</p>
              <p>• Below result — after file processed or output shown</p>
              <p>• Sidebar — desktop only, sticky on tool pages</p>
            </div>
            <button onClick={saveSettings} className="bg-gold-500 hover:bg-gold-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all">
              {saved ? '✓ Saved!' : '💾 Save Ad Code'}
            </button>
          </div>
        )}

        {/* Settings */}
        {tab === 'settings' && (
          <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-5 animate-fade-up max-w-lg">
            <h3 className="text-white font-semibold">⚙️ Site Settings</h3>
            <div>
              <label className="block text-xs font-semibold text-navy-400 mb-2 uppercase tracking-wide">Site Name</label>
              <input value={settings.siteName || 'ToolHive'} onChange={e => setSettings(s => ({ ...s, siteName: e.target.value }))}
                className="w-full bg-navy-800 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-400 mb-2 uppercase tracking-wide">Announcement Banner</label>
              <input value={settings.announcement || ''} onChange={e => setSettings(s => ({ ...s, announcement: e.target.value }))}
                placeholder="Leave empty to hide banner"
                className="w-full bg-navy-800 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-navy-300">Show public stats counter</span>
              <button onClick={() => setSettings(s => ({ ...s, showStats: !s.showStats }))}
                className={`w-11 h-6 rounded-full transition-colors ${settings.showStats ? 'bg-gold-500' : 'bg-navy-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full ml-1 transition-transform ${settings.showStats ? 'translate-x-5' : ''}`} />
              </button>
            </div>
            <button onClick={saveSettings} className="bg-gold-500 hover:bg-gold-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all">
              {saved ? '✓ Saved!' : '💾 Save Settings'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
