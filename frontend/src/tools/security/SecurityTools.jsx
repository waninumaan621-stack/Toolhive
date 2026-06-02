import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

const CopyBtn = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return <button onClick={copy} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>{copied ? '✓ Copied' : '📋 Copy'}</button>;
};

// ── Password Generator ────────────────────────────────────────────────────
export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [passwords, setPasswords] = useState([]);

  const generate = () => {
    let chars = '';
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!chars) return alert('Select at least one character type.');
    const generated = Array.from({ length: 5 }, () =>
      Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    );
    setPasswords(generated);
  };

  return (
    <div className="space-y-5">
      <div><label className="label">Length: {length}</label><input type="range" min="8" max="64" value={length} onChange={e => setLength(+e.target.value)} className="w-full accent-gold-500" /></div>
      <div className="flex flex-wrap gap-3">
        {[['Uppercase A-Z', upper, setUpper],['Lowercase a-z', lower, setLower],['Numbers 0-9', numbers, setNumbers],['Symbols !@#', symbols, setSymbols]].map(([label, val, setter]) => (
          <label key={label} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
            <input type="checkbox" checked={val} onChange={e => setter(e.target.checked)} className="accent-gold-500" />{label}
          </label>
        ))}
      </div>
      <button onClick={generate} className="btn-gold px-6 py-2.5">🔑 Generate 5 Passwords</button>
      {passwords.length > 0 && (
        <div className="space-y-2">
          {passwords.map((p, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-navy-800 rounded-xl px-4 py-3">
              <code className="text-sm font-mono text-navy-900 dark:text-white break-all flex-1 mr-3">{p}</code>
              <CopyBtn text={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Password Strength ─────────────────────────────────────────────────────
export function PasswordStrength() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const check = (p) => {
    let score = 0; const issues = []; const good = [];
    if (p.length >= 8) { score++; good.push('At least 8 characters'); } else issues.push('Use at least 8 characters');
    if (p.length >= 12) { score++; good.push('12+ characters'); }
    if (/[A-Z]/.test(p)) { score++; good.push('Has uppercase letters'); } else issues.push('Add uppercase letters');
    if (/[a-z]/.test(p)) { score++; good.push('Has lowercase letters'); } else issues.push('Add lowercase letters');
    if (/[0-9]/.test(p)) { score++; good.push('Has numbers'); } else issues.push('Add numbers');
    if (/[^A-Za-z0-9]/.test(p)) { score++; good.push('Has special characters'); } else issues.push('Add special characters (!@#$%)');
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = ['red', 'orange', 'yellow', 'blue', 'green', 'emerald'];
    return { score, level: levels[Math.min(score, 5)], color: colors[Math.min(score, 5)], issues, good };
  };

  const result = password ? check(password) : null;
  const colorMap = { red: 'bg-red-500', orange: 'bg-orange-500', yellow: 'bg-yellow-500', blue: 'bg-blue-500', green: 'bg-green-500', emerald: 'bg-emerald-500' };
  const textMap = { red: 'text-red-600', orange: 'text-orange-600', yellow: 'text-yellow-600', blue: 'text-blue-600', green: 'text-green-600', emerald: 'text-emerald-600' };

  return (
    <div className="space-y-5">
      <div className="relative">
        <label className="label">Enter Password to Check</label>
        <input type={show ? 'text' : 'password'} className="input-field pr-12" placeholder="Type your password…" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={() => setShow(!show)} className="absolute right-3 top-8 text-gray-400 hover:text-gray-600">{show ? '🙈' : '👁️'}</button>
      </div>
      {result && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`font-bold text-sm ${textMap[result.color]}`}>{result.level}</span>
              <span className="text-xs text-gray-400">{result.score}/6</span>
            </div>
            <div className="flex gap-1">
              {Array.from({length: 6}, (_, i) => (
                <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < result.score ? colorMap[result.color] : 'bg-gray-200 dark:bg-navy-700'}`} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.good.map(g => <div key={g} className="text-xs text-green-600 flex items-center gap-1.5">✅ {g}</div>)}
            {result.issues.map(i => <div key={i} className="text-xs text-red-500 flex items-center gap-1.5">❌ {i}</div>)}
          </div>
        </div>
      )}
    </div>
  );
}

// ── MD5 Hash ──────────────────────────────────────────────────────────────
export function Md5Hash() {
  const [input, setInput] = useState('');
  const hash = input ? CryptoJS.MD5(input).toString() : '';
  return (
    <div className="space-y-5">
      <div><label className="label">Input Text</label><textarea className="input-field h-32 resize-none" placeholder="Enter text to hash…" value={input} onChange={e => setInput(e.target.value)} /></div>
      {hash && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="label mb-0">MD5 Hash</span><CopyBtn text={hash} /></div>
          <code className="block bg-gray-50 dark:bg-navy-800 rounded-xl px-4 py-3 text-sm font-mono text-navy-900 dark:text-white break-all">{hash}</code>
        </div>
      )}
    </div>
  );
}

// ── SHA256 Hash ───────────────────────────────────────────────────────────
export function Sha256Hash() {
  const [input, setInput] = useState('');
  const hash = input ? CryptoJS.SHA256(input).toString() : '';
  return (
    <div className="space-y-5">
      <div><label className="label">Input Text</label><textarea className="input-field h-32 resize-none" placeholder="Enter text to hash…" value={input} onChange={e => setInput(e.target.value)} /></div>
      {hash && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="label mb-0">SHA256 Hash</span><CopyBtn text={hash} /></div>
          <code className="block bg-gray-50 dark:bg-navy-800 rounded-xl px-4 py-3 text-sm font-mono text-navy-900 dark:text-white break-all">{hash}</code>
        </div>
      )}
    </div>
  );
}

// ── Base64 Encode/Decode ──────────────────────────────────────────────────
export function Base64Encode() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('encode');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const process = () => {
    setError('');
    try {
      if (mode === 'encode') setResult(btoa(unescape(encodeURIComponent(input))));
      else setResult(decodeURIComponent(escape(atob(input))));
    } catch { setError('Invalid Base64 input for decoding.'); }
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {[['encode','Encode'],['decode','Decode']].map(([v, l]) => (
          <button key={v} onClick={() => setMode(v)}
            className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${mode===v ? 'bg-gold-500 text-white border-gold-500' : 'bg-white dark:bg-navy-800 border-gray-200 dark:border-navy-700 text-gray-700 dark:text-gray-300'}`}>
            {l}
          </button>
        ))}
      </div>
      <textarea className="input-field h-32 resize-none" placeholder={mode === 'encode' ? 'Enter text to encode…' : 'Enter Base64 to decode…'} value={input} onChange={e => setInput(e.target.value)} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button onClick={process} disabled={!input} className="btn-gold px-6 py-2.5">{mode === 'encode' ? '🔒 Encode' : '🔓 Decode'}</button>
      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="label mb-0">Result</span><CopyBtn text={result} /></div>
          <textarea className="input-field h-32 resize-none font-mono text-xs" value={result} readOnly />
        </div>
      )}
    </div>
  );
}

// ── URL Encode/Decode ─────────────────────────────────────────────────────
export function UrlEncode() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('encode');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const process = () => {
    setError('');
    try {
      if (mode === 'encode') setResult(encodeURIComponent(input));
      else setResult(decodeURIComponent(input));
    } catch { setError('Invalid URL encoded string.'); }
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {[['encode','Encode'],['decode','Decode']].map(([v, l]) => (
          <button key={v} onClick={() => setMode(v)}
            className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${mode===v ? 'bg-gold-500 text-white border-gold-500' : 'bg-white dark:bg-navy-800 border-gray-200 dark:border-navy-700 text-gray-700 dark:text-gray-300'}`}>
            {l}
          </button>
        ))}
      </div>
      <textarea className="input-field h-24 resize-none" placeholder={mode === 'encode' ? 'Enter URL to encode…' : 'Enter encoded URL to decode…'} value={input} onChange={e => setInput(e.target.value)} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button onClick={process} disabled={!input} className="btn-gold px-6 py-2.5">{mode === 'encode' ? '🔒 Encode' : '🔓 Decode'}</button>
      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="label mb-0">Result</span><CopyBtn text={result} /></div>
          <textarea className="input-field h-24 resize-none font-mono text-sm" value={result} readOnly />
        </div>
      )}
    </div>
  );
}

// ── UUID Generator ────────────────────────────────────────────────────────
export function UuidGenerator() {
  const [uuids, setUuids] = useState([]);
  const [count, setCount] = useState(5);

  const generate = () => setUuids(Array.from({ length: count }, () => uuidv4()));

  return (
    <div className="space-y-5">
      <div className="flex items-end gap-4">
        <div className="flex-1"><label className="label">How many UUIDs?</label><input className="input-field" type="number" min="1" max="50" value={count} onChange={e => setCount(+e.target.value)} /></div>
        <button onClick={generate} className="btn-gold px-6 py-2.5">🎲 Generate</button>
      </div>
      {uuids.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-end"><button onClick={() => navigator.clipboard.writeText(uuids.join('\n'))} className="text-xs text-gold-600 hover:text-gold-700 font-medium">📋 Copy All</button></div>
          {uuids.map((u, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-navy-800 rounded-xl px-4 py-3">
              <code className="text-sm font-mono text-navy-900 dark:text-white">{u}</code>
              <CopyBtn text={u} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
