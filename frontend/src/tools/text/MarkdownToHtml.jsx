import { useState } from 'react';

export default function MarkdownToHtml() {
  const [md, setMd] = useState('# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item 1\n- Item 2\n- Item 3');
  const [copied, setCopied] = useState(false);

  const convert = (text) => text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^(?!<[h|u|l|p]).+$/gm, m => m.trim() ? `<p>${m}</p>` : '')
    .trim();

  const html = convert(md);

  const copy = () => { navigator.clipboard.writeText(html); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const download = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([html], {type:'text/html'})); a.download='converted.html'; a.click(); };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="label">Markdown Input</label>
          <textarea className="input-field h-64 resize-none font-mono text-xs" value={md} onChange={e => setMd(e.target.value)} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="label mb-0">HTML Output</label>
            <div className="flex gap-2">
              <button onClick={copy} className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 hover:bg-gray-200'}`}>{copied ? '✓' : '📋'} Copy</button>
              <button onClick={download} className="text-xs px-3 py-1 rounded-lg bg-amber-500 text-white font-medium">⬇</button>
            </div>
          </div>
          <textarea className="input-field h-64 resize-none font-mono text-xs" value={html} readOnly />
        </div>
      </div>
      <div>
        <label className="label">Preview</label>
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5 prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
