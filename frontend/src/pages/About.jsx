import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`ToolHive Contact: ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:waninumaan621@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-up space-y-10 py-4">
      {/* About */}
      <div className="card p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-white font-bold text-2xl shadow-md">T</div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">About ToolHive</h1>
            <p className="text-gray-400 text-sm">Free tools for everyone</p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          ToolHive is a free collection of {`100+`} online tools for PDF, images, text, security, web development, office work, and file management. Every tool works directly in your browser — no login, no signup, no data sent to any server.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Built and maintained by <span className="text-amber-600 font-semibold">Wani Numaan</span> to help freelancers, students, developers, and everyday computer users get things done quickly without installing software.
        </p>
      </div>

      {/* Creator */}
      <div className="card p-8">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">👤 Creator</h2>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl flex-shrink-0">🧑‍💻</div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Wani Numaan</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Full-stack developer & creator of ToolHive, ProposalPilot AI, and StudentPilot AI.</p>
            <a href="mailto:waninumaan621@gmail.com"
              className="inline-flex items-center gap-1.5 mt-3 text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors">
              ✉️ waninumaan621@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Contact form */}
      <div className="card p-8">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">📬 Contact Us</h2>
        <p className="text-sm text-gray-400 mb-6">Have a suggestion, found a bug, or want a new tool added? Let us know!</p>

        {sent ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5 text-center">
            <p className="text-2xl mb-2">✅</p>
            <p className="font-semibold text-green-700 dark:text-green-400">Message ready to send!</p>
            <p className="text-sm text-green-600 dark:text-green-500 mt-1">Your email app should have opened. If not, email us directly at <strong>waninumaan621@gmail.com</strong></p>
            <button onClick={() => setSent(false)} className="mt-4 text-sm text-green-600 underline">Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Your Name</label>
                <input className="input-field" placeholder="John Smith" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div>
                <label className="label">Your Email</label>
                <input type="email" className="input-field" placeholder="you@example.com" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
              </div>
            </div>
            <div>
              <label className="label">Message</label>
              <textarea className="input-field resize-none h-32" placeholder="Tell us your suggestion, bug report, or question…"
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <button type="submit" className="btn-gold px-6 py-2.5">📨 Send Message</button>
              <a href="mailto:waninumaan621@gmail.com" className="btn-ghost px-6 py-2.5 text-sm">
                ✉️ Email directly
              </a>
            </div>
            <p className="text-xs text-gray-400">We usually respond within 24 hours.</p>
          </form>
        )}
      </div>

      {/* Quick links */}
      <div className="card p-6">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Quick Links</h2>
        <div className="flex flex-wrap gap-2">
          <Link to="/" className="btn-ghost text-sm px-4 py-2">🏠 Home</Link>
          <Link to="/category/pdf" className="btn-ghost text-sm px-4 py-2">📄 PDF Tools</Link>
          <Link to="/category/image" className="btn-ghost text-sm px-4 py-2">🖼️ Image Tools</Link>
          <Link to="/category/office" className="btn-ghost text-sm px-4 py-2">💼 Office Tools</Link>
        </div>
      </div>
    </div>
  );
}
