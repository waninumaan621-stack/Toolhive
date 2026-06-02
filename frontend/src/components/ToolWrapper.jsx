import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdSlot from './AdSlot';
import { trackVisit } from '../lib/api';
import { TOOLS } from '../lib/tools';

const categoryNames = {
  pdf: 'PDF Tools', image: 'Image Tools', text: 'Text Tools',
  security: 'Security Tools', web: 'Web & Dev Tools',
  office: 'Office Tools', file: 'File Tools',
};

function RelatedTools({ currentId, category }) {
  const related = TOOLS.filter(t => t.category === category && t.id !== currentId).slice(0, 4);
  if (!related.length) return null;
  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
        More {categoryNames[category]} →
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {related.map(t => (
          <Link key={t.id} to={`/tools/${t.id}`}
            className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl p-3 flex items-center gap-2 hover:border-amber-300 dark:hover:border-amber-600 transition-all">
            <span className="text-lg flex-shrink-0">{t.icon}</span>
            <span className="text-xs font-medium text-slate-900 dark:text-white truncate">{t.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ToolWrapper({ tool, children }) {
  useEffect(() => {
    if (tool) trackVisit(tool.id, tool.category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tool?.id]);

  return (
    <div className="animate-fade-up">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-5 flex-wrap">
        <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
        <span>›</span>
        <Link to={`/category/${tool?.category}`} className="hover:text-amber-500 transition-colors">
          {categoryNames[tool?.category]}
        </Link>
        <span>›</span>
        <span className="text-gray-600 dark:text-gray-300">{tool?.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
          <span>{tool?.icon}</span>{tool?.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{tool?.desc}</p>
        {tool?.limit && tool.limit !== 'No limit' && tool.limit !== 'No upload' && (
          <div className="inline-flex items-center gap-1.5 mt-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-1">
            <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">📏 Max: {tool.limit}</span>
          </div>
        )}
      </div>

      <div className="flex gap-6">
        <div className="flex-1 min-w-0 space-y-4">
          <AdSlot type="banner" />
          <div className="card p-6">{children}</div>
          <AdSlot type="rectangle" />
        </div>
        <div className="hidden xl:block w-64 flex-shrink-0">
          <div className="sticky top-20"><AdSlot type="sidebar" /></div>
        </div>
      </div>

      <RelatedTools currentId={tool?.id} category={tool?.category} />
    </div>
  );
}
