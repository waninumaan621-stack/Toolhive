import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../lib/theme';
import { CATEGORIES } from '../lib/tools';
import AdSlot from './AdSlot';

const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
    <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center shadow-sm">
      <span className="text-white font-bold text-sm">T</span>
    </div>
    <span className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">
      Tool<span className="text-amber-500">Hive</span>
    </span>
  </Link>
);

export default function Layout({ children }) {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950">
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-md'
            : 'bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <Logo />

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  to={`/category/${c.id}`}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 transition-all"
                >
                  {c.icon} {c.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1">
              {/* Theme toggle */}
              <button
                onClick={toggle}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-500 dark:text-gray-400 text-lg"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              {/* Hamburger - always visible */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-5 flex flex-col gap-1.5">
                  <span
                    className={`block h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all ${
                      menuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all ${
                      menuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all ${
                      menuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Full hamburger menu */}
        {menuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-xl z-50 animate-slide-down">
            <div className="max-w-7xl mx-auto px-4 py-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 mb-5">
                <Link
                  to="/"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-slate-800 hover:text-amber-600 transition-colors"
                >
                  🏠 Home
                </Link>
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.id}
                    to={`/category/${c.id}`}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-slate-800 hover:text-amber-600 transition-colors"
                  >
                    {c.icon} {c.name}
                  </Link>
                ))}
                <Link
                  to="/about"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-slate-800 hover:text-amber-600 transition-colors"
                >
                  ℹ️ About & Contact
                </Link>
              </div>

              {/* Contact info directly in menu */}
              <div className="border-t border-gray-100 dark:border-slate-800 pt-4 flex flex-wrap items-center gap-4">
                <span className="text-xs text-gray-400">Need help?</span>
                <a
                  href="mailto:waninumaan621@gmail.com"
                  className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                >
                  ✉️ waninumaan621@gmail.com
                </a>
                <span className="text-xs text-gray-300 dark:text-slate-600">•</span>
                <span className="text-xs text-gray-400">Created by Wani Numaan</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {menuOpen && <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />}

      {/* Ad banner - only shows if code pasted */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-3">
        <AdSlot type="banner" />
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
            <div>
              <Logo />
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Free online tools for everyone. No login, no limits.
              </p>
            </div>

            {CATEGORIES.slice(0, 3).map((c) => (
              <div key={c.id}>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  {c.name}
                </p>
                <div className="space-y-1">
                  <Link
                    to={`/category/${c.id}`}
                    className="block text-xs text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    Browse {c.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 dark:border-slate-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">
              © 2026 ToolHive. Created by{' '}
              <span className="text-amber-600 font-medium">Wani Numaan</span>. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="mailto:waninumaan621@gmail.com"
                className="text-xs text-gray-400 hover:text-amber-500 transition-colors"
              >
                ✉️ waninumaan621@gmail.com
              </a>
              <Link to="/privacy" className="text-xs text-gray-400 hover:text-amber-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-gray-400 hover:text-amber-500 transition-colors">
                Terms of Service
              </Link>
              <Link to="/about" className="text-xs text-gray-400 hover:text-amber-500 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
