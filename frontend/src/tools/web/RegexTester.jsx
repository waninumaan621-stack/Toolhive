import { useState } from 'react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('\\d+');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Hello 123 World 456\nTest 789 here');
  const [replace, setReplace] = useState('');
  const [error, setError] = useState('');

  const getMatches = () => {
    setError('');
    try {
      const regex = new RegExp(pattern, flags);
      const matches = [...text.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'))];
      return matches;
    } catch (e) { setError(e.message); return []; }
  };

  const getReplaced = () => {
    try {
      return text.replace(new RegExp(pattern, flags), replace);
    } catch { return ''; }
  };

  const matches = pattern ? getMatches() : [];
  const replaced = replace !== '' && pattern ? getReplaced() : '';

  const highlightText = () => {
    if (!pattern || error) return text;
    try {
      return text.replace(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'),
        m => `<mark class="bg-amber-200 dark:bg-amber-700 rounded px-0.5">${m}</mark>`);
    } catch { return text; }
  };

  const EXAMPLES = [
    { label: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'g' },
    { label: 'Phone', pattern: '\\+?[0-9]{10,13}', flags: 'g' },
    { label: 'URL', pattern: 'https?:\\/\\/[^\\s]+', flags: 'g' },
    { label: 'Numbers', pattern: '\\d+', flags: 'g' },
    { label: 'Words', pattern: '\\b\\w+\\b', flags: 'g' },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-3">
          <label className="label">Regex Pattern</label>
          <input className="input-field font-mono" placeholder="\\d+" value={pattern} onChange={e => setPattern(e.target.value)} />
        </div>
        <div>
          <label className="label">Flags</label>
          <input className="input-field font-mono" placeholder="g" value={flags} onChange={e => setFlags(e.target.value)} />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">⚠️ {error}</p>}

      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-gray-400 self-center">Examples:</span>
        {EXAMPLES.map(ex => (
          <button key={ex.label} onClick={() => { setPattern(ex.pattern); setFlags(ex.flags); }}
            className="text-xs px-3 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-amber-100 hover:text-amber-700 transition-colors">
            {ex.label}
          </button>
        ))}
      </div>

      <div>
        <label className="label">Test String</label>
        <textarea className="input-field h-32 resize-none font-mono text-sm" value={text} onChange={e => setText(e.target.value)} />
      </div>

      {/* Highlighted matches */}
      {pattern && !error && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="label mb-0">Matches ({matches.length})</label>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 font-mono text-sm whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightText() }} />
        </div>
      )}

      {matches.length > 0 && (
        <div className="space-y-2">
          <label className="label">All Matches</label>
          {matches.slice(0, 20).map((m, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-2">
              <span className="text-xs text-gray-400 w-6">{i + 1}</span>
              <code className="text-sm text-amber-600 flex-1">{m[0]}</code>
              <span className="text-xs text-gray-400">at {m.index}</span>
            </div>
          ))}
        </div>
      )}

      <div>
        <label className="label">Replace with (optional)</label>
        <div className="flex gap-3">
          <input className="input-field flex-1 font-mono" placeholder="Replacement string…" value={replace} onChange={e => setReplace(e.target.value)} />
        </div>
      </div>

      {replaced && (
        <div>
          <label className="label">Result after replace</label>
          <textarea className="input-field h-24 resize-none font-mono text-sm" value={replaced} readOnly />
        </div>
      )}
    </div>
  );
}
