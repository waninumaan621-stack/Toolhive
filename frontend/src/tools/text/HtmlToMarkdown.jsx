import { useState } from 'react';

export default function HtmlToMarkdown() {
  const [html, setHtml] = useState('<h1>Hello World</h1>\n<p>This is <strong>bold</strong> and <em>italic</em> text.</p>\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>');
  const [copied, setCopied] = useState(false);

  const convert = (text) => text
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<[ou]l[^>]*>/gi, '\n').replace(/<\/[ou]l>/gi, '\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const md = convert(html);
  const copy = () => { navigator.clipboard.writeText(md); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="label">HTML Input</label>
          <textarea className="input-field h-64 resize-none font-mono text-xs" value={html} onChange={e => setHtml(e.target.value)} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="label mb-0">Markdown Output</label>
            <button onClick={copy} className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 hover:bg-gray-200'}`}>{copied ? '✓ Copied' : '📋 Copy'}</button>
          </div>
          <textarea className="input-field h-64 resize-none font-mono text-xs" value={md} readOnly />
        </div>
      </div>
    </div>
  );
}
