import { useParams, Link } from 'react-router-dom';
import { TOOLS, CATEGORIES } from '../lib/tools';
import AdSlot from '../components/AdSlot';

export default function CategoryPage() {
  const { cat } = useParams();
  const category = CATEGORIES.find(c => c.id === cat);
  const tools = TOOLS.filter(t => t.category === cat);

  if (!category) return (
    <div className="text-center py-20">
      <p className="text-gray-500 mb-4">Category not found.</p>
      <Link to="/" className="btn-gold px-6 py-2.5">Go Home</Link>
    </div>
  );

  return (
    <div className="animate-fade-up">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
        <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
        <span>›</span>
        <span className="text-gray-600 dark:text-gray-300">{category.name}</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>{category.icon}</span>{category.name}
        </h1>
        <p className="text-gray-400 text-sm mt-1">{tools.length} free tools — no login needed</p>
      </div>

      <AdSlot type="banner" className="mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map(tool => (
          <Link key={tool.id} to={`/tools/${tool.id}`}
            className="tool-card flex items-start gap-3">
            <span className="text-2xl flex-shrink-0 mt-0.5">{tool.icon}</span>
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-900 dark:text-white hover:text-amber-600 transition-colors text-sm mb-1 truncate">
                {tool.name}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{tool.desc}</p>
              {tool.limit && tool.limit !== 'No limit' && (
                <span className="inline-block mt-1.5 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-amber-800">
                  Max: {tool.limit}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
