import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import * as Icons from 'lucide-react';
import { getCategoryById, getToolsByCategory } from '../data/tools';

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getCategoryById(categoryId || '');
  const tools = getToolsByCategory(categoryId || '');

  const getIcon = (iconName: string, className: string = 'w-6 h-6') => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Category not found</h1>
          <Link to="/categories" className="text-[#1e3a5f] dark:text-[#d4a843] hover:underline">
            ← Back to categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-[#1e3a5f] dark:hover:text-[#d4a843]">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/categories" className="text-gray-500 hover:text-[#1e3a5f] dark:hover:text-[#d4a843]">Categories</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 py-12 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div className={`w-20 h-20 ${category.color} rounded-2xl flex items-center justify-center text-white`}>
              {getIcon(category.icon, 'w-10 h-10')}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {category.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {tools.length} Tools Available
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              to={`/tools/${tool.id}`}
              className="tool-card group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:border-[#d4a843]/30"
            >
              <div className="w-12 h-12 bg-[#1e3a5f]/10 dark:bg-[#d4a843]/10 rounded-xl flex items-center justify-center text-[#1e3a5f] dark:text-[#d4a843] mb-4 group-hover:scale-110 transition-transform">
                {getIcon(tool.icon)}
              </div>
              
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#1e3a5f] dark:group-hover:text-[#d4a843]">
                {tool.name}
                {tool.isAI && <Sparkles className="inline w-4 h-4 ml-1 text-[#d4a843]" />}
              </h3>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
