import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS, CATEGORIES, searchTools } from '../lib/tools';
import AdSlot from '../components/AdSlot';
import { trackVisit } from '../lib/api';

const CATEGORY_COLORS = {
  pdf: 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/40 text-red-600 dark:text-red-400',
  image: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/40 text-blue-600 dark:text-blue-400',
  text: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/40 text-green-600 dark:text-green-400',
  security: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/40 text-purple-600 dark:text-purple-400',
  web: 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/40 text-amber-600 dark:text-amber-400',
  office: 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/40 text-orange-600 dark:text-orange-400',
  file: 'bg-teal-50 dark:bg-teal-900/20 border-teal-100 dark:border-teal-900/40 text-teal-600 dark:text-teal-400',
};

const CategoryCard = ({ cat }) => (
  <Link to={`/category/${cat.id}`}
    className="tool-card text-center hover:scale-105 transition-transform duration-200">
    <div className="text-3xl mb-2">{cat.icon}</div>
    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{cat.name}</h3>
  </Link>
);

const ToolCard = ({ tool }) => (
  <Link to={`/tools/${tool.id}`} className="tool-card flex items-start gap-3">
    <span className="text-xl flex-shrink-0 mt-0.5">{tool.icon}</span>
    <div className="min-w-0">
      <h3 className="font-semibold text-sm text-slate-900 dark:text-white hover:text-amber-600 transition-colors truncate">
        {tool.name}
      </h3>
      <p className="text-xs text-gray-400 leading-relaxed mt-0.5 line-clamp-2">{tool.desc}</p>
    </div>
  </Link>
);

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    trackVisit('homepage', 'general');
    fetch((import.meta.env.VITE_API_URL || '/api') + '/stats/public')
      .then(r => r.json()).then(setStats).catch(() => {});
    // Animate tool count
    let n = 0;
    const target = TOOLS.length;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      n = Math.min(n + step, target);
      setCount(n);
      if (n >= target) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (search.trim()) setResults(searchTools(search));
    else setResults([]);
  }, [search]);

  return (
    <div className="animate-fade-up space-y-12">
      {/* Hero */}
      <div className="text-center pt-8 pb-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight tracking-tight">
          Every tool you need,<br />
          <span className="text-amber-500">completely free.</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-3 leading-relaxed">
          PDF, Image, Text, Security, Web, Office & File tools.
          No signup, no login, no nonsense.
        </p>
        {stats?.totalOperations > 0 && (
          <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-6">
            🔥 {parseInt(stats.totalOperations).toLocaleString()}+ operations completed
          </p>
        )}

        {/* Animated counter */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900 dark:text-white animate-count">{count}</p>
            <p className="text-xs text-gray-400">Free Tools</p>
          </div>
          <div className="w-px h-10 bg-gray-200 dark:bg-slate-700" />
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{CATEGORIES.length}</p>
            <p className="text-xs text-gray-400">Categories</p>
          </div>
          <div className="w-px h-10 bg-gray-200 dark:bg-slate-700" />
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900 dark:text-white">0</p>
            <p className="text-xs text-gray-400">Login Required</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">🔍</span>
          <input
            className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl pl-11 pr-10 py-3.5 text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 shadow-sm transition-all"
            placeholder="Search any tool… PDF, QR code, password…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoComplete="off"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
          )}
        </div>
      </div>

      {/* Search results */}
      {search && (
        <div className="animate-fade-up">
          <h2 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">
            {results.length > 0 ? `${results.length} results for "${search}"` : `No results for "${search}"`}
          </h2>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {results.map(t => <ToolCard key={t.id} tool={t} />)}
            </div>
          ) : (
            <div className="card p-8 text-center text-gray-400">
              No tools match your search. Try different keywords.
            </div>
          )}
        </div>
      )}

      {!search && (
        <>
          {/* Category grid */}
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Browse by Category</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {CATEGORIES.map(c => <CategoryCard key={c.id} cat={c} />)}
            </div>
          </div>

          {/* All tools by category */}
          {CATEGORIES.map((cat, i) => (
            <div key={cat.id} className="animate-fade-up">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
                  <span>{cat.icon}</span>
                  {cat.name}
                </h2>
                <Link to={`/category/${cat.id}`}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors">
                  See all →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {TOOLS.filter(t => t.category === cat.id).slice(0, 8).map(t => (
                  <ToolCard key={t.id} tool={t} />
                ))}
              </div>
              {/* Ad after every 2 categories */}
              {i % 2 === 1 && <div className="mt-6"><AdSlot type="banner" /></div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
