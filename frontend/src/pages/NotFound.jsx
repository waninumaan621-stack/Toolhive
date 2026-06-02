import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-24 animate-fade-up">
      <p className="text-7xl mb-4">🔧</p>
      <h1 className="font-display text-3xl font-bold text-navy-900 dark:text-white mb-2">Page Not Found</h1>
      <p className="text-gray-400 mb-6">This page doesn't exist. Try browsing our tools instead.</p>
      <Link to="/" className="btn-gold px-8 py-3">Browse All Tools</Link>
    </div>
  );
}
