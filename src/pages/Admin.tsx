import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Lock, Eye, EyeOff, AlertCircle, BarChart3, Settings, Code, Globe } from 'lucide-react';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  
  const { 
    isAdminLoggedIn, 
    adminLogin, 
    adminLogout,
    loginAttempts,
    lockoutUntil,
    adSenseCode,
    setAdSenseCode,
    announcement,
    setAnnouncement,
    toolUses,
    geminiApiKey,
    setGeminiApiKey
  } = useStore();

  const isLockedOut = lockoutUntil && Date.now() < lockoutUntil;
  const remainingLockout = lockoutUntil ? Math.ceil((lockoutUntil - Date.now()) / (1000 * 60 * 60)) : 0;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isLockedOut) {
      setError(`Account locked. Try again in ${remainingLockout} hours.`);
      return;
    }
    
    const success = adminLogin(username, password);
    if (!success) {
      const remaining = 3 - (loginAttempts + 1);
      if (remaining > 0) {
        setError(`Invalid credentials. ${remaining} attempts remaining.`);
      } else {
        setError('Account locked for 24 hours due to too many failed attempts.');
      }
    }
  };

  // Mock stats
  const stats = {
    todayVisitors: 1234,
    totalVisitors: 45678,
    todayToolUses: 567,
    totalToolUses: Object.values(toolUses).reduce((a, b) => a + b, 0) + 12345,
  };

  const topTools = Object.entries(toolUses)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, uses]) => ({ name, uses }));

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#d4a843]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#d4a843]" />
              </div>
              <h1 className="text-2xl font-bold text-white">Admin Login</h1>
              <p className="text-gray-400 mt-2">Enter your credentials to continue</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 mb-6">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#d4a843] focus:border-transparent"
                  placeholder="Enter username"
                  disabled={!!isLockedOut}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#d4a843] focus:border-transparent"
                    placeholder="Enter password"
                    disabled={!!isLockedOut}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={!!isLockedOut}
                className="w-full py-3 bg-[#d4a843] hover:bg-[#e5c478] text-gray-900 font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLockedOut ? `Locked (${remainingLockout}h)` : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <button
            onClick={adminLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'tools', name: 'Tools', icon: <Settings className="w-4 h-4" /> },
            { id: 'ads', name: 'AdSense', icon: <Code className="w-4 h-4" /> },
            { id: 'settings', name: 'Settings', icon: <Globe className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#1e3a5f] text-white dark:bg-[#d4a843] dark:text-gray-900'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Today Visitors', value: stats.todayVisitors.toLocaleString() },
                { label: 'Total Visitors', value: stats.totalVisitors.toLocaleString() },
                { label: 'Today Tool Uses', value: stats.todayToolUses.toLocaleString() },
                { label: 'Total Tool Uses', value: stats.totalToolUses.toLocaleString() },
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Top Tools</h2>
            {topTools.length > 0 ? (
              <div className="space-y-3">
                {topTools.map((tool, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <span className="text-gray-900 dark:text-white capitalize">{tool.name.replace(/-/g, ' ')}</span>
                    <span className="text-[#1e3a5f] dark:text-[#d4a843] font-bold">{tool.uses}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No tool usage data yet.</p>
            )}
          </div>
        )}

        {/* Ads Tab */}
        {activeTab === 'ads' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Google AdSense Code</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Paste your AdSense code below. It will appear in all ad slots across the website.
              </p>
              <textarea
                value={adSenseCode}
                onChange={(e) => setAdSenseCode(e.target.value)}
                placeholder="Paste your AdSense code here..."
                className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
              />
              <p className="text-sm text-gray-400 mt-2">
                {adSenseCode ? '✓ AdSense code is active' : 'No AdSense code configured'}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Gemini AI API Key</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Enter your Google Gemini API key to enable AI-powered tools. Get a free key at{' '}
                <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-[#d4a843] hover:underline">
                  Google AI Studio
                </a>
              </p>
              <input
                type="password"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder="Enter your Gemini API key..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
              />
              <p className="text-sm text-gray-400 mt-2">
                {geminiApiKey ? '✓ Gemini API key is configured' : '⚠ No API key - AI tools will show fallback messages'}
              </p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Announcement Banner</h2>
              <input
                type="text"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                placeholder="Enter announcement text (leave empty to hide)"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
