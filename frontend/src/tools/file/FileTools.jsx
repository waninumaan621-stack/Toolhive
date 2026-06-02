import { useState } from 'react';

const CopyBtn = ({ text }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>
      {copied ? '✓ Copied' : '📋 Copy'}
    </button>
  );
};

const FileUpload = ({ onFile, accept = '*', label = 'Upload file', maxMB = 5 }) => (
  <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-amber-400 transition-colors cursor-pointer"
    onClick={() => document.getElementById(`fu-${label.replace(/\s/g,'-')}`).click()}>
    <p className="text-3xl mb-2">📁</p>
    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
    <p className="text-xs text-gray-400 mt-1">Max {maxMB}MB</p>
    <input id={`fu-${label.replace(/\s/g,'-')}`} type="file" accept={accept} className="hidden"
      onChange={e => e.target.files[0] && onFile(e.target.files[0])} />
  </div>
);

// Text File Creator
export function TextFileCreator() {
  const [text, setText] = useState('');
  const [filename, setFilename] = useState('document');
  const download = (ext) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    a.download = `${filename}.${ext}`; a.click();
  };
  return (
    <div className="space-y-5">
      <div><label className="label">Filename</label>
        <input className="input-field" value={filename} onChange={e => setFilename(e.target.value)} placeholder="document" />
      </div>
      <div><label className="label">Content</label>
        <textarea className="input-field h-48 resize-none" placeholder="Type or paste your content here…" value={text} onChange={e => setText(e.target.value)} />
      </div>
      <p className="text-xs text-gray-400">{text.length} characters · {text.split('\n').length} lines</p>
      <div className="flex gap-3 flex-wrap">
        <button onClick={() => download('txt')} disabled={!text} className="btn-gold px-5 py-2.5">⬇ Download .txt</button>
        <button onClick={() => download('md')} disabled={!text} className="btn-ghost px-5 py-2.5">⬇ Download .md</button>
        <button onClick={() => download('html')} disabled={!text} className="btn-ghost px-5 py-2.5">⬇ Download .html</button>
      </div>
    </div>
  );
}

// File to Base64
export function FileToBase64() {
  const [result, setResult] = useState('');
  const [info, setInfo] = useState(null);
  const handle = (file) => {
    setInfo({ name: file.name, size: (file.size / 1024).toFixed(1), type: file.type });
    const reader = new FileReader();
    reader.onload = e => setResult(e.target.result);
    reader.readAsDataURL(file);
  };
  return (
    <div className="space-y-5">
      <FileUpload onFile={handle} accept="*" label="Upload any file to convert" maxMB={5} />
      {info && <p className="text-xs text-gray-400">📄 {info.name} — {info.size}KB — {info.type}</p>}
      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{result.length.toLocaleString()} characters</span>
            <CopyBtn text={result} />
          </div>
          <textarea className="input-field h-32 font-mono text-xs resize-none" value={result} readOnly />
        </div>
      )}
    </div>
  );
}

// Base64 to File
export function Base64ToFile() {
  const [input, setInput] = useState('');
  const [filename, setFilename] = useState('file');
  const [error, setError] = useState('');
  const download = () => {
    setError('');
    try {
      let b64 = input.trim();
      let mimeType = 'application/octet-stream';
      let ext = 'bin';
      if (b64.startsWith('data:')) {
        const match = b64.match(/data:([^;]+);base64,(.+)/);
        if (match) { mimeType = match[1]; b64 = match[2]; ext = mimeType.split('/')[1] || 'bin'; }
      }
      const binary = atob(b64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([bytes], { type: mimeType }));
      a.download = filename || `file.${ext}`; a.click();
    } catch { setError('Invalid Base64 string. Please check your input.'); }
  };
  return (
    <div className="space-y-5">
      <div><label className="label">Filename (with extension)</label>
        <input className="input-field" value={filename} onChange={e => setFilename(e.target.value)} placeholder="image.png" />
      </div>
      <div><label className="label">Base64 String</label>
        <textarea className="input-field h-40 font-mono text-xs resize-none" placeholder="Paste base64 string here (with or without data: prefix)…" value={input} onChange={e => setInput(e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-500">⚠️ {error}</p>}
      <button onClick={download} disabled={!input} className="btn-gold px-6 py-2.5">⬇ Download File</button>
    </div>
  );
}

// Word Frequency
export function WordFrequency() {
  const [text, setText] = useState('');
  const [minLen, setMinLen] = useState(3);
  const [results, setResults] = useState([]);

  const analyze = () => {
    const words = text.toLowerCase().match(/\b[a-zA-Z]{3,}\b/g) || [];
    const freq = {};
    words.filter(w => w.length >= minLen).forEach(w => freq[w] = (freq[w] || 0) + 1);
    setResults(Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 30));
  };

  const handleFile = async (file) => {
    const t = await file.text();
    setText(t);
  };

  return (
    <div className="space-y-5">
      <textarea className="input-field h-32 resize-none" placeholder="Paste text here or upload a file below…" value={text} onChange={e => setText(e.target.value)} />
      <FileUpload onFile={handleFile} accept=".txt,.md,.csv" label="Or upload text file" maxMB={5} />
      <div className="flex items-center gap-4">
        <div><label className="label">Min word length</label>
          <input type="number" className="input-field w-24" min="1" max="10" value={minLen} onChange={e => setMinLen(+e.target.value)} />
        </div>
        <button onClick={analyze} disabled={!text} className="btn-gold px-6 py-2.5 mt-5">📊 Analyze</button>
      </div>
      {results.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-400">Top {results.length} words</p>
          {results.map(([word, count], i) => (
            <div key={word} className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-5">{i + 1}.</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white w-32">{word}</span>
              <div className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(count / results[0][1]) * 100}%` }} />
              </div>
              <span className="text-xs text-gray-500 w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Line Counter
export function LineCounter() {
  const [text, setText] = useState('');
  const handleFile = async (file) => setText(await file.text());
  const lines = text.split('\n');
  const nonEmpty = lines.filter(l => l.trim()).length;
  const blank = lines.length - nonEmpty;
  return (
    <div className="space-y-5">
      <textarea className="input-field h-40 resize-none font-mono text-sm" placeholder="Paste text or upload file…" value={text} onChange={e => setText(e.target.value)} />
      <FileUpload onFile={handleFile} accept=".txt,.md,.csv,.json,.js,.py,.html,.css" label="Or upload text file" maxMB={5} />
      {text && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[['Total Lines', lines.length], ['Non-empty', nonEmpty], ['Blank Lines', blank], ['Characters', text.length]].map(([l, v]) => (
            <div key={l} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">{l}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{v.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// File Compare
export function FileCompare() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [diff, setDiff] = useState(null);
  const loadFile = async (file, setter) => setter(await file.text());

  const compare = () => {
    const linesA = textA.split('\n');
    const linesB = textB.split('\n');
    const result = [];
    const max = Math.max(linesA.length, linesB.length);
    for (let i = 0; i < max; i++) {
      const a = linesA[i] ?? null;
      const b = linesB[i] ?? null;
      if (a === b) result.push({ type: 'same', a, b, line: i + 1 });
      else result.push({ type: 'diff', a, b, line: i + 1 });
    }
    setDiff(result);
  };

  const diffCount = diff?.filter(d => d.type === 'diff').length || 0;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">File A</label>
          <textarea className="input-field h-32 resize-none font-mono text-xs" placeholder="Paste content of file A…" value={textA} onChange={e => setTextA(e.target.value)} />
          <div className="mt-2 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-xl p-3 text-center hover:border-amber-400 transition-colors cursor-pointer"
            onClick={() => document.getElementById('file-a-input').click()}>
            <p className="text-xs text-gray-400">Upload File A</p>
            <input id="file-a-input" type="file" accept=".txt,.md,.json,.js,.py,.css,.html" className="hidden" onChange={e => e.target.files[0] && loadFile(e.target.files[0], setTextA)} />
          </div>
        </div>
        <div>
          <label className="label">File B</label>
          <textarea className="input-field h-32 resize-none font-mono text-xs" placeholder="Paste content of file B…" value={textB} onChange={e => setTextB(e.target.value)} />
          <div className="mt-2 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-xl p-3 text-center hover:border-amber-400 transition-colors cursor-pointer"
            onClick={() => document.getElementById('file-b-input').click()}>
            <p className="text-xs text-gray-400">Upload File B</p>
            <input id="file-b-input" type="file" accept=".txt,.md,.json,.js,.py,.css,.html" className="hidden" onChange={e => e.target.files[0] && loadFile(e.target.files[0], setTextB)} />
          </div>
        </div>
      </div>
      <button onClick={compare} disabled={!textA || !textB} className="btn-gold px-6 py-2.5">🔀 Compare Files</button>
      {diff && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {diffCount === 0 ? '✅ Files are identical!' : `⚠️ ${diffCount} line(s) differ`}
          </p>
          <div className="rounded-xl border border-gray-100 dark:border-slate-800 overflow-hidden max-h-80 overflow-y-auto">
            {diff.filter(d => d.type === 'diff').slice(0, 50).map((item, i) => (
              <div key={i} className="border-b border-gray-50 dark:border-slate-800 last:border-0">
                <p className="px-3 py-1 text-xs text-gray-400 bg-gray-50 dark:bg-slate-800/50">Line {item.line}</p>
                {item.a !== null && <p className="px-3 py-1.5 text-xs font-mono text-red-600 bg-red-50 dark:bg-red-900/10">- {item.a}</p>}
                {item.b !== null && <p className="px-3 py-1.5 text-xs font-mono text-green-600 bg-green-50 dark:bg-green-900/10">+ {item.b}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// JSON Validator
export function JsonValidator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const validate = () => {
    try {
      const parsed = JSON.parse(input);
      const keys = typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 0;
      setResult({ valid: true, type: Array.isArray(parsed) ? 'Array' : typeof parsed, keys, items: Array.isArray(parsed) ? parsed.length : null });
    } catch (e) { setResult({ valid: false, error: e.message }); }
  };
  return (
    <div className="space-y-5">
      <div><label className="label">JSON Input</label>
        <textarea className="input-field h-48 font-mono text-xs resize-none" placeholder='{"key": "value"}' value={input} onChange={e => setInput(e.target.value)} />
      </div>
      <button onClick={validate} disabled={!input} className="btn-gold px-6 py-2.5">✅ Validate JSON</button>
      {result && (
        <div className={`rounded-xl p-4 border ${result.valid ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
          {result.valid ? (
            <div className="space-y-1">
              <p className="font-semibold text-green-700 dark:text-green-400">✅ Valid JSON</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Type: <strong>{result.type}</strong></p>
              {result.type === 'object' && <p className="text-sm text-gray-600 dark:text-gray-400">Keys: <strong>{result.keys}</strong></p>}
              {result.items !== null && <p className="text-sm text-gray-600 dark:text-gray-400">Items: <strong>{result.items}</strong></p>}
            </div>
          ) : (
            <div>
              <p className="font-semibold text-red-600 dark:text-red-400">❌ Invalid JSON</p>
              <p className="text-sm text-red-500 mt-1 font-mono">{result.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// XML Formatter
export function XmlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const format = () => {
    setError('');
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, 'application/xml');
      const err = doc.querySelector('parsererror');
      if (err) throw new Error('Invalid XML');
      const serializer = new XMLSerializer();
      let xml = serializer.serializeToString(doc);
      // Pretty print
      let indent = 0;
      xml = xml.replace(/></g, '>\n<').split('\n').map(line => {
        if (line.match(/^<\//)) indent--;
        const result = '  '.repeat(Math.max(0, indent)) + line.trim();
        if (line.match(/^<[^/!?]/) && !line.match(/\/>$/) && !line.match(/<\/.*>$/)) indent++;
        return result;
      }).join('\n');
      setOutput(xml);
    } catch (e) { setError('Invalid XML: ' + e.message); }
  };
  return (
    <div className="space-y-5">
      <div><label className="label">XML Input</label>
        <textarea className="input-field h-40 font-mono text-xs resize-none" placeholder="<root><item>value</item></root>" value={input} onChange={e => setInput(e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button onClick={format} disabled={!input} className="btn-gold px-6 py-2.5">Format XML</button>
      {output && (
        <div className="space-y-2">
          <div className="flex justify-end"><CopyBtn text={output} /></div>
          <textarea className="input-field h-48 font-mono text-xs resize-none" value={output} readOnly />
        </div>
      )}
    </div>
  );
}

// SQL Formatter
export function SqlFormatter() {
  const [input, setInput] = useState('');
  const format = (sql) => {
    const keywords = ['SELECT','FROM','WHERE','JOIN','LEFT JOIN','RIGHT JOIN','INNER JOIN','ON','AND','OR','ORDER BY','GROUP BY','HAVING','LIMIT','INSERT INTO','VALUES','UPDATE','SET','DELETE FROM','CREATE TABLE','ALTER TABLE','DROP TABLE','INDEX','UNION','AS','DISTINCT','COUNT','SUM','AVG','MAX','MIN'];
    let result = sql.toUpperCase();
    keywords.forEach(kw => {
      result = result.replace(new RegExp(`\\b${kw}\\b`, 'gi'), `\n${kw}\n`);
    });
    return result.split('\n').map(l => l.trim()).filter(Boolean).join('\n');
  };
  const output = input ? format(input) : '';
  return (
    <div className="space-y-5">
      <div><label className="label">SQL Query</label>
        <textarea className="input-field h-40 font-mono text-xs resize-none" placeholder="SELECT * FROM users WHERE id = 1;" value={input} onChange={e => setInput(e.target.value)} />
      </div>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="label mb-0">Formatted SQL</span><CopyBtn text={output} /></div>
          <textarea className="input-field h-48 font-mono text-xs resize-none" value={output} readOnly />
        </div>
      )}
    </div>
  );
}

// HTML Formatter
export function HtmlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const format = () => {
    let indent = 0;
    const lines = input.replace(/></g, '>\n<').split('\n');
    const formatted = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.match(/^<\//)) indent = Math.max(0, indent - 1);
      const result = '  '.repeat(indent) + trimmed;
      if (trimmed.match(/^<[^/!?]/) && !trimmed.match(/\/>$/) && !trimmed.match(/<\/.*>$/)) indent++;
      return result;
    });
    setOutput(formatted.join('\n'));
  };
  return (
    <div className="space-y-5">
      <div><label className="label">HTML Input</label>
        <textarea className="input-field h-40 font-mono text-xs resize-none" placeholder="<div><p>Hello</p></div>" value={input} onChange={e => setInput(e.target.value)} />
      </div>
      <button onClick={format} disabled={!input} className="btn-gold px-6 py-2.5">Format HTML</button>
      {output && (
        <div className="space-y-2">
          <div className="flex justify-end"><CopyBtn text={output} /></div>
          <textarea className="input-field h-48 font-mono text-xs resize-none" value={output} readOnly />
        </div>
      )}
    </div>
  );
}

// Character Frequency
export function CharFrequency() {
  const [text, setText] = useState('');
  const [showAll, setShowAll] = useState(false);
  const freq = text ? [...text].reduce((acc, c) => { acc[c] = (acc[c] || 0) + 1; return acc; }, {}) : {};
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const shown = showAll ? sorted : sorted.slice(0, 15);
  return (
    <div className="space-y-5">
      <textarea className="input-field h-32 resize-none" placeholder="Type or paste text to analyze character frequency…" value={text} onChange={e => setText(e.target.value)} />
      {sorted.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-400">{sorted.length} unique characters</p>
          {shown.map(([char, count]) => (
            <div key={char} className="flex items-center gap-3">
              <code className="text-sm font-mono font-bold text-slate-900 dark:text-white w-8 text-center bg-gray-100 dark:bg-slate-800 rounded-lg py-0.5">
                {char === ' ' ? '·' : char === '\n' ? '↵' : char}
              </code>
              <div className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(count / sorted[0][1]) * 100}%` }} />
              </div>
              <span className="text-xs text-gray-500 w-8 text-right">{count}</span>
              <span className="text-xs text-gray-400 w-10 text-right">{((count / text.length) * 100).toFixed(1)}%</span>
            </div>
          ))}
          {sorted.length > 15 && (
            <button onClick={() => setShowAll(!showAll)} className="text-xs text-amber-600 hover:text-amber-700">
              {showAll ? 'Show less' : `Show all ${sorted.length} characters`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Text Sorter
export function TextSorter() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const sort = (type) => {
    const lines = text.split('\n').filter(l => l.trim());
    if (type === 'az') setResult([...lines].sort().join('\n'));
    else if (type === 'za') setResult([...lines].sort().reverse().join('\n'));
    else if (type === 'len-asc') setResult([...lines].sort((a, b) => a.length - b.length).join('\n'));
    else if (type === 'len-desc') setResult([...lines].sort((a, b) => b.length - a.length).join('\n'));
    else if (type === 'random') setResult([...lines].sort(() => Math.random() - 0.5).join('\n'));
  };
  return (
    <div className="space-y-5">
      <textarea className="input-field h-40 resize-none" placeholder="One item per line…" value={text} onChange={e => setText(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        {[['az','A → Z'],['za','Z → A'],['len-asc','Shortest first'],['len-desc','Longest first'],['random','Random shuffle']].map(([t, l]) => (
          <button key={t} onClick={() => sort(t)} disabled={!text} className="btn-ghost text-sm px-4 py-2">{l}</button>
        ))}
      </div>
      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{result.split('\n').length} lines</span>
            <CopyBtn text={result} />
          </div>
          <textarea className="input-field h-40 resize-none" value={result} readOnly />
        </div>
      )}
    </div>
  );
}

// Number Sorter
export function NumberSorter() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const parse = () => input.split(/[\n,\s]+/).map(Number).filter(n => !isNaN(n) && n !== 0 || input.includes('0'));
  const sort = (dir) => {
    const nums = parse();
    const sorted = dir === 'asc' ? [...nums].sort((a, b) => a - b) : [...nums].sort((a, b) => b - a);
    setResult(sorted.join(', '));
  };
  const nums = parse();
  return (
    <div className="space-y-5">
      <div><label className="label">Numbers (comma, space, or newline separated)</label>
        <textarea className="input-field h-32 resize-none font-mono" placeholder="5, 3, 8, 1, 9, 2, 7, 4, 6" value={input} onChange={e => setInput(e.target.value)} />
      </div>
      {nums.length > 0 && (
        <div className="flex gap-3 flex-wrap text-xs text-gray-500">
          <span>Count: <strong>{nums.length}</strong></span>
          <span>Sum: <strong>{nums.reduce((a, b) => a + b, 0)}</strong></span>
          <span>Avg: <strong>{(nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2)}</strong></span>
          <span>Min: <strong>{Math.min(...nums)}</strong></span>
          <span>Max: <strong>{Math.max(...nums)}</strong></span>
        </div>
      )}
      <div className="flex gap-3">
        <button onClick={() => sort('asc')} disabled={!input} className="btn-gold px-5 py-2.5">↑ Sort Ascending</button>
        <button onClick={() => sort('desc')} disabled={!input} className="btn-ghost px-5 py-2.5">↓ Sort Descending</button>
      </div>
      {result && (
        <div className="space-y-2">
          <div className="flex justify-end"><CopyBtn text={result} /></div>
          <textarea className="input-field h-24 resize-none font-mono text-sm" value={result} readOnly />
        </div>
      )}
    </div>
  );
}

// List Randomizer
export function ListRandomizer() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [picks, setPicks] = useState(1);

  const shuffle = () => {
    const items = input.split('\n').filter(l => l.trim());
    setResult([...items].sort(() => Math.random() - 0.5).join('\n'));
  };

  const pickRandom = () => {
    const items = input.split('\n').filter(l => l.trim());
    const selected = [];
    const pool = [...items];
    for (let i = 0; i < Math.min(picks, pool.length); i++) {
      const idx = Math.floor(Math.random() * pool.length);
      selected.push(pool.splice(idx, 1)[0]);
    }
    setResult(selected.join('\n'));
  };

  return (
    <div className="space-y-5">
      <textarea className="input-field h-40 resize-none" placeholder="One item per line…&#10;Apple&#10;Banana&#10;Cherry" value={input} onChange={e => setInput(e.target.value)} />
      <div className="flex flex-wrap gap-3 items-end">
        <button onClick={shuffle} disabled={!input} className="btn-gold px-5 py-2.5">🔀 Shuffle All</button>
        <div className="flex items-center gap-2">
          <input type="number" className="input-field w-20" min="1" value={picks} onChange={e => setPicks(+e.target.value)} />
          <button onClick={pickRandom} disabled={!input} className="btn-ghost px-4 py-2.5">🎲 Pick Random</button>
        </div>
      </div>
      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{result.split('\n').length} items</span>
            <CopyBtn text={result} />
          </div>
          <textarea className="input-field h-40 resize-none" value={result} readOnly />
        </div>
      )}
    </div>
  );
}

// Text to List
export function TextToList() {
  const [text, setText] = useState('');
  const [separator, setSeparator] = useState('newline');
  const [format, setFormat] = useState('bullet');

  const getItems = () => {
    const sep = separator === 'newline' ? '\n' : separator === 'comma' ? ',' : separator === 'semicolon' ? ';' : '|';
    return text.split(sep).map(i => i.trim()).filter(Boolean);
  };

  const getOutput = () => {
    const items = getItems();
    if (format === 'bullet') return items.map(i => `• ${i}`).join('\n');
    if (format === 'numbered') return items.map((i, n) => `${n + 1}. ${i}`).join('\n');
    if (format === 'checkbox') return items.map(i => `☐ ${i}`).join('\n');
    if (format === 'json') return JSON.stringify(items, null, 2);
    if (format === 'csv') return items.join(',');
    return items.join('\n');
  };

  const output = text ? getOutput() : '';

  return (
    <div className="space-y-5">
      <textarea className="input-field h-32 resize-none" placeholder="Paste your text here…" value={text} onChange={e => setText(e.target.value)} />
      <div className="grid grid-cols-2 gap-4">
        <div><label className="label">Split by</label>
          <select className="input-field" value={separator} onChange={e => setSeparator(e.target.value)}>
            <option value="newline">New line</option>
            <option value="comma">Comma (,)</option>
            <option value="semicolon">Semicolon (;)</option>
            <option value="|">Pipe (|)</option>
          </select>
        </div>
        <div><label className="label">Format as</label>
          <select className="input-field" value={format} onChange={e => setFormat(e.target.value)}>
            <option value="bullet">• Bullet list</option>
            <option value="numbered">1. Numbered list</option>
            <option value="checkbox">☐ Checkbox list</option>
            <option value="json">[ ] JSON array</option>
            <option value="csv">CSV (comma)</option>
          </select>
        </div>
      </div>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{getItems().length} items</span>
            <CopyBtn text={output} />
          </div>
          <textarea className="input-field h-40 resize-none font-mono text-sm" value={output} readOnly />
        </div>
      )}
    </div>
  );
}

// Slug Generator
export function SlugGenerator() {
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState('-');

  const generate = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e').replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o').replace(/[ùúûü]/g, 'u').replace(/[ñ]/g, 'n')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, separator)
      .replace(/-+/g, separator)
      .replace(/^-|-$/g, '');
  };

  const slug = input ? generate(input) : '';
  const variants = [
    { label: 'URL Slug', value: generate(input) },
    { label: 'Underscore', value: generate(input).replace(/-/g, '_') },
    { label: 'No separator', value: generate(input).replace(/-/g, '') },
    { label: 'PascalCase', value: input.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('') },
    { label: 'camelCase', value: input.split(/\s+/).map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('') },
  ];

  return (
    <div className="space-y-5">
      <div><label className="label">Title or Text</label>
        <input className="input-field" placeholder="My Amazing Blog Post Title" value={input} onChange={e => setInput(e.target.value)} />
      </div>
      {slug && (
        <div className="space-y-2">
          {variants.map(v => (
            <div key={v.label} className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-3">
              <span className="text-xs text-gray-400 w-28 flex-shrink-0">{v.label}</span>
              <code className="text-sm font-mono text-amber-600 flex-1">{v.value}</code>
              <CopyBtn text={v.value} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
