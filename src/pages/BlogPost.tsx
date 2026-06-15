import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Clock, Calendar, User, Share2, ArrowLeft } from 'lucide-react';
import { getBlogPostById, blogPosts } from '../data/blog';
import AdBanner from '../components/Layout/AdBanner';

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = getBlogPostById(postId || '');
  const relatedPosts = blogPosts.filter(p => p.id !== postId).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h1>
          <Link to="/blog" className="text-[#1e3a5f] dark:text-[#d4a843] hover:underline">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-[#1e3a5f] dark:hover:text-[#d4a843]">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/blog" className="text-gray-500 hover:text-[#1e3a5f] dark:hover:text-[#d4a843]">Blog</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-[#1e3a5f]/10 dark:bg-[#d4a843]/10 text-[#1e3a5f] dark:text-[#d4a843] rounded-full text-sm font-medium capitalize mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8"
        />

        <AdBanner position="inline" className="mb-8" />

        {/* Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
          {post.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('```')) {
              return (
                <pre key={i} className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto my-4">
                  <code>{paragraph.replace(/```\w*\n?/g, '')}</code>
                </pre>
              );
            }
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={i} className="list-disc pl-6 space-y-2">
                  {paragraph.split('\n').map((item, j) => (
                    <li key={j} className="text-gray-600 dark:text-gray-300">{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed">{paragraph}</p>;
          })}
        </article>

        {/* Share */}
        <div className="flex items-center gap-4 py-6 border-y border-gray-200 dark:border-gray-700 mb-12">
          <span className="text-gray-600 dark:text-gray-400">Share this article:</span>
          <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Related Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <Link
                key={p.id}
                to={`/blog/${p.id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-[#d4a843] line-clamp-2">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Link
          to="/blog"
          className="inline-flex items-center gap-2 mt-8 text-[#1e3a5f] dark:text-[#d4a843] font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all articles
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
