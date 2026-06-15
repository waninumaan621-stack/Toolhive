import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import * as Icons from 'lucide-react';
import { categories, tools } from '../data/tools';
import AdBanner from '../components/Layout/AdBanner';

const Home = () => {
  const getIcon = (iconName: string, className: string = 'w-6 h-6') => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  const popularTools = tools.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d4a6f] to-[#1e3a5f] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#d4a843] rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#d4a843] rounded-full blur-[120px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-[#d4a843] text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              300+ Free Online Tools
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Every Tool You Need,
              <br />
              <span className="text-[#d4a843]">Completely Free</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              PDF converters, image editors, text tools, security utilities and more. 
              No sign-up required, no hidden costs. Just free tools that work.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/categories"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#d4a843] hover:bg-[#e5c478] text-[#1e3a5f] font-bold rounded-xl transition-all shadow-lg shadow-[#d4a843]/25"
              >
                Explore All Tools
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/blog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all backdrop-blur-sm"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-white dark:fill-gray-900"/>
          </svg>
        </div>
      </section>

      <AdBanner position="top" className="max-w-7xl mx-auto px-4 mt-8" />

      {/* Features */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="w-8 h-8" />, title: 'Lightning Fast', desc: 'All tools work instantly in your browser. No waiting, no uploads to slow servers.' },
              { icon: <Shield className="w-8 h-8" />, title: '100% Secure', desc: 'Your files never leave your device. Everything is processed locally for privacy.' },
              { icon: <Globe className="w-8 h-8" />, title: 'Works Everywhere', desc: 'Use on any device - desktop, tablet, or phone. No installation needed.' },
            ].map((feature, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1e3a5f]/10 dark:bg-[#d4a843]/10 rounded-2xl text-[#1e3a5f] dark:text-[#d4a843] mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Tool Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Browse through our comprehensive collection of tools organized by category
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {getIcon(category.icon)}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{category.toolCount} tools</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdBanner position="inline" className="max-w-7xl mx-auto px-4 my-8" />

      {/* Popular Tools */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Popular Tools
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Most used tools by our community</p>
            </div>
            <Link
              to="/categories"
              className="hidden md:flex items-center gap-2 text-[#1e3a5f] dark:text-[#d4a843] font-semibold hover:underline"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTools.map((tool) => (
              <Link
                key={tool.id}
                to={`/tools/${tool.id}`}
                className="tool-card group p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-white dark:hover:bg-gray-700 border border-transparent hover:border-[#d4a843]/30"
              >
                <div className="w-12 h-12 bg-[#1e3a5f]/10 dark:bg-[#d4a843]/10 rounded-xl flex items-center justify-center text-[#1e3a5f] dark:text-[#d4a843] mb-4 group-hover:scale-110 transition-transform">
                  {getIcon(tool.icon)}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#1e3a5f] dark:group-hover:text-[#d4a843]">
                  {tool.name}
                  {tool.isAI && <Sparkles className="inline w-4 h-4 ml-1 text-[#d4a843]" />}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to boost your productivity?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of users who save time every day with our free tools.
          </p>
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4a843] hover:bg-[#e5c478] text-[#1e3a5f] font-bold rounded-xl transition-all shadow-lg"
          >
            Start Using Tools Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
