import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { categories } from '../data/tools';

const Categories = () => {
  const getIcon = (iconName: string, className: string = 'w-8 h-8') => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            All Tool Categories
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse through 10 categories containing over 300 free online tools
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                {getIcon(category.icon)}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#1e3a5f] dark:group-hover:text-[#d4a843]">
                {category.name}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {category.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1e3a5f] dark:text-[#d4a843]">
                  {category.toolCount} tools
                </span>
                <span className="text-[#1e3a5f] dark:text-[#d4a843] group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '300+', label: 'Free Tools' },
              { value: '10', label: 'Categories' },
              { value: '100%', label: 'Free Forever' },
              { value: '0', label: 'Sign-ups Required' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold text-[#d4a843] mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
