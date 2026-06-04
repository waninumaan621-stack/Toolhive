import { useParams, Link } from 'react-router-dom';
import { POSTS } from './Blog';
import AdSlot from '../components/AdSlot';

export default function BlogPost() {
  const { id } = useParams();
  const post = POSTS.find(p => p.id === id);

  if (!post) return (
    <div className="text-center py-20">
      <p className="text-gray-400 mb-4">Post not found.</p>
      <Link to="/blog" className="btn-gold px-6 py-2.5">Back to Blog</Link>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto animate-fade-up">
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
        <Link to="/" className="hover:text-amber-500">Home</Link>
        <span>›</span>
        <Link to="/blog" className="hover:text-amber-500">Blog</Link>
        <span>›</span>
        <span className="text-gray-600 dark:text-gray-300 truncate">{post.title}</span>
      </div>

      <div className="card p-8 space-y-6">
        <div>
          <span className="text-xs text-amber-600 font-semibold">{post.category}</span>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-2 leading-snug">{post.title}</h1>
          <p className="text-xs text-gray-400">{post.date} · 3 min read</p>
        </div>

        <AdSlot type="banner" />

        <div className="prose prose-sm max-w-none dark:prose-invert">
          {post.content.split('\n\n').map((para, i) => (
            <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{para}</p>
          ))}
        </div>

        <AdSlot type="rectangle" />

        <div className="border-t border-gray-100 dark:border-slate-800 pt-5">
          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Related Tools</p>
          <Link to={`/category/${post.category.toLowerCase().split(' ')[0]}`}
            className="btn-gold px-5 py-2.5 text-sm">
            Browse {post.category} →
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <Link to="/blog" className="text-sm text-amber-600 hover:text-amber-700">← Back to Blog</Link>
      </div>
    </div>
  );
}
